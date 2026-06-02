"use client";

import React from "react";
import { ImageKitProvider } from "@imagekit/react";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "";

interface ImageKitProviderWrapperProps {
  children: React.ReactNode;
}

export default function ImageKitProviderWrapper({ children }: ImageKitProviderWrapperProps) {
  // If the endpoint is not set, wrap children in a simple fragment so the site still runs fine.
  if (!urlEndpoint) {
    return <>{children}</>;
  }

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      {children}
    </ImageKitProvider>
  );
}
