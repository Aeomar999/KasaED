import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Modal,
  Linking,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import * as Speech from "expo-speech";
import { Button } from "../components/shared/Button";
import { Card } from "../components/shared/Card";
import {
  generateChatbotResponse,
  emergencyContacts,
} from "../utils/chatbotLogic";
import { loadMessages, saveMessages, loadUserProfile } from "../utils/storage";
import { generateMessageId } from "../utils/encryption";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "../theme/theme";

const ChatScreen = () => {
  const { t } = useTranslation();
  const scrollViewRef = useRef();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Feature modals
  const [showPeriodTracker, setShowPeriodTracker] = useState(false);
  const [showSTICalculator, setShowSTICalculator] = useState(false);
  const [showRelationshipChecker, setShowRelationshipChecker] = useState(false);
  const [showMedicationChecker, setShowMedicationChecker] = useState(false);
  const [showClinicFinder, setShowClinicFinder] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const initializeChat = async () => {
    const savedMessages = await loadMessages();
    const profile = await loadUserProfile();
    setUserProfile(profile);

    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      addBotMessage(t("greeting"));
    }
  };

  const addBotMessage = (text, quickReplies = null) => {
    const newMessage = {
      id: generateMessageId(),
      type: "bot",
      text,
      timestamp: new Date().toISOString(),
      quickReplies,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addUserMessage = (text) => {
    const newMessage = {
      id: generateMessageId(),
      type: "user",
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Generate bot response
    setTimeout(() => {
      const response = generateChatbotResponse(text, userProfile);
      addBotMessage(response.text, response.quickReplies);

      if (response.isCrisis) {
        setShowEmergencyContacts(true);
      }
    }, 500);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      addUserMessage(inputText.trim());
      setInputText("");
    }
  };

  const handleQuickReply = (reply) => {
    addUserMessage(reply);
  };

  const handleMenuOption = (option) => {
    setShowMenu(false);

    switch (option) {
      case "periodTracker":
        setShowPeriodTracker(true);
        break;
      case "stiCalculator":
        setShowSTICalculator(true);
        break;
      case "relationshipChecker":
        setShowRelationshipChecker(true);
        break;
      case "medicationChecker":
        setShowMedicationChecker(true);
        break;
      case "clinicFinder":
        setShowClinicFinder(true);
        break;
      case "emergencyContacts":
        setShowEmergencyContacts(true);
        break;
      case "voiceChat":
        setShowVoiceChat(true);
        break;
      default:
        addUserMessage(option);
    }
  };

  const handlePanicButton = () => {
    setShowEmergency(true);
  };

  const handleExitEmergency = () => {
    Linking.openURL("https://www.google.com");
  };

  const toggleTTS = (text) => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(text, {
        language: userProfile?.language === "tw" ? "en-GB" : "en-US",
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.type === "user";

    return (
      <View
        style={[styles.messageContainer, isUser && styles.userMessageContainer]}
      >
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>
            {item.text}
          </Text>
          {!isUser && (
            <TouchableOpacity
              style={styles.ttsButton}
              onPress={() => toggleTTS(item.text)}
            >
              <Text style={styles.ttsIcon}>{isSpeaking ? "🔇" : "🔊"}</Text>
            </TouchableOpacity>
          )}
        </View>
        {item.quickReplies && (
          <View style={styles.quickRepliesContainer}>
            {item.quickReplies.map((reply, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickReplyButton}
                onPress={() => handleQuickReply(reply)}
              >
                <Text style={styles.quickReplyText}>{reply}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setShowMenu(true)}
            style={styles.menuButton}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.appName}>{t("appName")}</Text>
          <TouchableOpacity
            onPress={handlePanicButton}
            style={styles.panicButton}
          >
            <Text style={styles.panicText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          ref={scrollViewRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input Area */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={t("chatPlaceholder")}
            placeholderTextColor={colors.gray400}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Modal */}
        <Modal
          visible={showMenu}
          animationType="slide"
          transparent
          onRequestClose={() => setShowMenu(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.menuModal}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>{t("menu")}</Text>
                <TouchableOpacity onPress={() => setShowMenu(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.menuOptions}>
                <MenuOption
                  title={t("contraception")}
                  onPress={() => handleMenuOption("contraception")}
                />
                <MenuOption
                  title={t("sti")}
                  onPress={() => handleMenuOption("sti information")}
                />
                <MenuOption
                  title={t("pregnancy")}
                  onPress={() => handleMenuOption("pregnancy")}
                />
                <MenuOption
                  title={t("menstruation")}
                  onPress={() => handleMenuOption("menstruation")}
                />
                <MenuOption
                  title={t("consent")}
                  onPress={() => handleMenuOption("consent")}
                />
                <MenuOption
                  title={t("relationships")}
                  onPress={() => handleMenuOption("relationships")}
                />
                <MenuOption
                  title={t("bodyChanges")}
                  onPress={() => handleMenuOption("body changes")}
                />
                <MenuOption
                  title={t("mentalHealth")}
                  onPress={() => handleMenuOption("mental health")}
                />
                <MenuOption
                  title={t("periodTracker")}
                  onPress={() => handleMenuOption("periodTracker")}
                />
                <MenuOption
                  title={t("stiCalculator")}
                  onPress={() => handleMenuOption("stiCalculator")}
                />
                <MenuOption
                  title={t("relationshipChecker")}
                  onPress={() => handleMenuOption("relationshipChecker")}
                />
                <MenuOption
                  title={t("medicationChecker")}
                  onPress={() => handleMenuOption("medicationChecker")}
                />
                <MenuOption
                  title={t("clinicFinder")}
                  onPress={() => handleMenuOption("clinicFinder")}
                />
                <MenuOption
                  title={t("emergencyContacts")}
                  onPress={() => handleMenuOption("emergencyContacts")}
                />
                <MenuOption
                  title={t("voiceChat")}
                  onPress={() => handleMenuOption("voiceChat")}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Emergency Screen */}
        <Modal visible={showEmergency} animationType="fade" transparent={false}>
          <View style={styles.emergencyScreen}>
            <Text style={styles.emergencyTitle}>Quick Exit</Text>
            <Text style={styles.emergencyText}>
              This will redirect you to Google and clear this session.
            </Text>
            <Button
              title="Exit Now"
              onPress={handleExitEmergency}
              variant="danger"
              size="lg"
              fullWidth
              style={styles.emergencyButton}
            />
            <Button
              title="Cancel"
              onPress={() => setShowEmergency(false)}
              variant="ghost"
              fullWidth
            />
          </View>
        </Modal>

        {/* Emergency Contacts Modal */}
        <Modal
          visible={showEmergencyContacts}
          animationType="slide"
          transparent
          onRequestClose={() => setShowEmergencyContacts(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.contactsModal}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>🆘 Emergency Contacts</Text>
                <TouchableOpacity
                  onPress={() => setShowEmergencyContacts(false)}
                >
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                {emergencyContacts.map((contact, index) => (
                  <Card key={index} style={styles.contactCard}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactDescription}>
                      {contact.description}
                    </Text>
                    <TouchableOpacity
                      style={styles.callButton}
                      onPress={() => Linking.openURL(`tel:${contact.number}`)}
                    >
                      <Text style={styles.callButtonText}>
                        📞 Call {contact.number}
                      </Text>
                    </TouchableOpacity>
                  </Card>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const MenuOption = ({ title, onPress }) => (
  <TouchableOpacity style={styles.menuOption} onPress={onPress}>
    <Text style={styles.menuOptionText}>{title}</Text>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.primary600,
    ...shadows.md,
  },
  menuButton: {
    padding: spacing.sm,
  },
  menuIcon: {
    fontSize: typography.xxl,
    color: colors.white,
  },
  appName: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.white,
  },
  panicButton: {
    backgroundColor: colors.error,
    borderRadius: borderRadius.full,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  panicText: {
    fontSize: typography.lg,
    color: colors.white,
    fontWeight: typography.bold,
  },
  messagesContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  messageContainer: {
    marginBottom: spacing.lg,
    maxWidth: "80%",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
  },
  messageBubble: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  userBubble: {
    backgroundColor: colors.primary600,
    borderBottomRightRadius: spacing.xs,
  },
  botBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: spacing.xs,
  },
  messageText: {
    fontSize: typography.base,
    color: colors.gray900,
    lineHeight: typography.normal * typography.base,
  },
  userMessageText: {
    color: colors.white,
  },
  ttsButton: {
    marginTop: spacing.sm,
    alignSelf: "flex-start",
  },
  ttsIcon: {
    fontSize: typography.lg,
  },
  quickRepliesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  quickReplyButton: {
    backgroundColor: colors.primary100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary600,
  },
  quickReplyText: {
    fontSize: typography.sm,
    color: colors.primary600,
    fontWeight: typography.medium,
  },
  inputArea: {
    flexDirection: "row",
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    ...shadows.lg,
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: typography.base,
    color: colors.gray900,
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary600,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing.sm,
    ...shadows.md,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendIcon: {
    fontSize: typography.xl,
    color: colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  menuModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: "80%",
  },
  contactsModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: "80%",
    padding: spacing.lg,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  menuTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.gray900,
  },
  closeButton: {
    fontSize: typography.xxl,
    color: colors.gray600,
  },
  menuOptions: {
    padding: spacing.lg,
  },
  menuOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  menuOptionText: {
    fontSize: typography.base,
    color: colors.gray900,
  },
  menuArrow: {
    fontSize: typography.xl,
    color: colors.gray400,
  },
  emergencyScreen: {
    flex: 1,
    backgroundColor: colors.error,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxxl,
  },
  emergencyTitle: {
    fontSize: typography.xxxxl,
    fontWeight: typography.bold,
    color: colors.white,
    marginBottom: spacing.lg,
  },
  emergencyText: {
    fontSize: typography.lg,
    color: colors.white,
    textAlign: "center",
    marginBottom: spacing.xxxl,
    lineHeight: typography.relaxed * typography.lg,
  },
  emergencyButton: {
    marginBottom: spacing.lg,
  },
  contactCard: {
    marginBottom: spacing.md,
  },
  contactName: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  contactDescription: {
    fontSize: typography.sm,
    color: colors.gray600,
    marginBottom: spacing.md,
  },
  callButton: {
    backgroundColor: colors.success,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: "center",
  },
  callButtonText: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.white,
  },
});

export default ChatScreen;
