"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function WhatsAppWidget() {
  useEffect(() => {
    (window as any).whatsappWidgetConfig = {
      phoneNumber: "+919311343359",
      welcomeMessage: "Welcome to our custom chat! How may we assist you?",
      companyName: "ij_stories",
      agentName: "Lisa",
      closedMessage: "We are currently offline. Please leave a message.",
      customResponse: "This is a custom response message. Would you like to continue on WhatsApp?",
      position: "right",
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/1dev-hridoy/whatsapp-widget-chat-box-library@latest/src/whatsapp-widget.min.css"
      />
      <div id="whatsapp-widget-container"></div>
      <Script
        src="https://cdn.jsdelivr.net/gh/1dev-hridoy/whatsapp-widget-chat-box-library@latest/src/whatsapp-widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
