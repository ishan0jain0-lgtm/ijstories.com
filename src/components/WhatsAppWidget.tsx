import Script from "next/script";
import { getCachedDb } from "@/lib/db";

export default async function WhatsAppWidget() {
  const db = await getCachedDb();
  const config = db.websiteDetails;

  // Only render if a phone number is configured
  if (!config.whatsappPhone) return null;

  return (
    <Script
      src="https://cdn.jsdelivr.net/gh/xsukax/whatsapp-widget@latest/xsukax-whatsapp-widget.js"
      strategy="lazyOnload"
      data-phone={config.whatsappPhone}
      data-title={config.whatsappTitle || "ij_stories"}
      data-greeting={config.whatsappGreeting || "Welcome to our custom chat! How may we assist you?"}
      data-position="right"
      data-button-color="#b34a26"
    />
  );
}
