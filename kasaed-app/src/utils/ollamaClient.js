// src/utils/ollamaClient.js
const OLLAMA_API_URL = "http://localhost:11434/api/generate";

export const generateOllamaResponse = async (
  message,
  conversationHistory = []
) => {
  try {
    // Build context from conversation history
    const context = conversationHistory
      .slice(-5) // Last 5 messages for context
      .map(
        (msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`
      )
      .join("\n");

    const prompt = `${
      context
        ? `${context}

`
        : ""
    }User: ${message}

Assistant:`;

    const response = await fetch(OLLAMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "KasaED-model",
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          num_predict: 500,
          stop: ["<|end_of_sentence|>", "<|User|", "User:"],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API Error:", errorText);
      throw new Error(`Ollama API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("Ollama raw response:", data);

    // Clean the response - remove thinking tags and extra formatting
    let cleanedResponse = data.response || "";

    // Remove <think>...</think> blocks (DeepSeek-R1 reasoning)
    cleanedResponse = cleanedResponse.replace(/<think>[\s\S]*?<\/think>/gi, "");

    // Remove any remaining XML-like tags
    cleanedResponse = cleanedResponse.replace(/<\/?[^>]+(>|$)/g, "");

    // Remove special tokens that might appear
    cleanedResponse = cleanedResponse.replace(/<\|[^|]+\|>/g, "");

    // Remove "Assistant:" prefix if present at the start
    cleanedResponse = cleanedResponse.replace(/^\s*Assistant:\s*/i, "");

    // Trim whitespace and normalize line breaks
    cleanedResponse = cleanedResponse.trim().replace(/\n{3,}/g, "\n\n");

    // If response is empty after cleaning, use original
    if (!cleanedResponse) {
      cleanedResponse = data.response;
    }

    console.log("Cleaned response:", cleanedResponse);

    return {
      success: true,
      response: cleanedResponse,
      model: data.model,
    };
  } catch (error) {
    console.error("Ollama error:", error);
    return {
      success: false,
      error: error.message,
      fallback: true,
    };
  }
};

// Streaming version for real-time responses
export const streamOllamaResponse = async (
  message,
  conversationHistory = [],
  onChunk
) => {
  try {
    const context = conversationHistory
      .slice(-5)
      .map(
        (msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`
      )
      .join("\n");

    const prompt = `You are KasaEd, a compassionate SRH assistant. ${
      context
        ? `
${context}

`
        : ""
    }User: ${message}

Assistant:`;

    const response = await fetch(OLLAMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "KasaED-model",
        prompt: prompt,
        stream: true,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        },
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter((line) => line.trim());

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.response) {
            fullResponse += json.response;
            onChunk(json.response);
          }
        } catch (e) {
          console.error("Parse error:", e);
        }
      }
    }

    return { success: true, response: fullResponse };
  } catch (error) {
    console.error("Streaming error:", error);
    return { success: false, error: error.message };
  }
};

// Check if Ollama is available
export const checkOllamaAvailability = async () => {
  try {
    const response = await fetch("http://localhost:11434/api/tags", {
      method: "GET",
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
