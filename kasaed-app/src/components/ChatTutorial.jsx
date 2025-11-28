import React from 'react';
import { useTranslation } from 'react-i18next';
import TutorialOverlay from './TutorialOverlay';

const ChatTutorial = ({ onComplete, onSkip }) => {
    const { t } = useTranslation();

    const steps = [
        {
            target: 'body',
            title: t('tutorial.chat.welcome.title', 'Welcome to KasaEd Chat!'),
            content: t('tutorial.chat.welcome.content', 'This is your safe space to ask questions about sexual and reproductive health. Everything you say here is private and confidential.'),
            position: 'center'
        },
        {
            target: '.input-wrapper-centered',
            title: t('tutorial.chat.input.title', 'Type Your Questions'),
            content: t('tutorial.chat.input.content', 'Type your questions here. You can ask about anything - from contraception to relationships. Press Enter to send.'),
            position: 'top'
        },
        {
            target: '.quick-replies',
            title: t('tutorial.chat.quickReplies.title', 'Quick Suggestions'),
            content: t('tutorial.chat.quickReplies.content', 'Tap these suggested topics to quickly get information on common questions.'),
            position: 'top'
        },
        {
            target: '#voice-input-btn',
            title: t('tutorial.chat.voice.title', 'Voice Input'),
            content: t('tutorial.chat.voice.content', 'Prefer speaking? Tap the microphone to ask your question using your voice. Tap again to stop recording.'),
            position: 'top'
        },
        {
            target: '.language-toggle',
            title: t('tutorial.chat.language.title', 'Change Language'),
            content: t('tutorial.chat.language.content', 'Switch between English, Twi, Ewe, and Hausa anytime. The entire app will update to your chosen language.'),
            position: 'top'
        },
        {
            target: '.personality-indicator-centered',
            title: t('tutorial.chat.personality.title', 'Chat Personality'),
            content: t('tutorial.chat.personality.content', 'You can customize how KasaEd talks to you - friendly, professional, casual, or empathetic. Change this in the menu.'),
            position: 'top'
        },
        {
            target: '.sidebar-top-icons',
            title: t('tutorial.chat.history.title', 'Chat History'),
            content: t('tutorial.chat.history.content', 'Access your previous conversations here. All your chats are saved privately on your device.'),
            position: 'right'
        },
        {
            target: '#chat-menu-btn',
            title: t('tutorial.chat.menu.title', 'Features Menu'),
            content: t('tutorial.chat.menu.content', 'Access powerful features like mental health check-ins, mood tracking, period tracking, clinic finder, and more.'),
            position: 'bottom-left'
        },
        {
            target: '.stop-response-btn',
            title: t('tutorial.chat.stopResponse.title', 'Stop Response'),
            content: t('tutorial.chat.stopResponse.content', 'If a response is too long, you can stop it anytime by tapping this button.'),
            position: 'bottom'
        },
        {
            target: '#panic-button',
            title: t('tutorial.chat.panic.title', 'Quick Exit'),
            content: t('tutorial.chat.panic.content', 'Need to leave quickly for privacy? The Panic Button instantly redirects you to a safe page. Your safety matters.'),
            position: 'bottom-left'
        },
        {
            target: 'body',
            title: t('tutorial.chat.privacy.title', 'Your Privacy is Protected'),
            content: t('tutorial.chat.privacy.content', 'All conversations are encrypted and stored only on your device. We never share your data. You can set auto-delete timers too.'),
            position: 'center'
        },
        {
            target: 'body',
            title: t('tutorial.chat.ready.title', 'You\'re All Set!'),
            content: t('tutorial.chat.ready.content', 'You can replay this tutorial anytime from the Help menu. Feel free to ask any question - there are no silly questions here!'),
            position: 'center'
        }
    ];

    return (
        <TutorialOverlay
            steps={steps}
            onComplete={onComplete}
            onSkip={onSkip}
        />
    );
};

export default ChatTutorial;
