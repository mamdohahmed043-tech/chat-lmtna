import React, { useRef, useState } from "react";
import { SafeAreaView, View, ActivityIndicator, Text, StyleSheet, Button, Linking, Platform } from "react-native";
import { WebView } from "react-native-webview";

const SITE_URL = "https://www.lmtna.chat/ar/";

export default function App() {
  const webviewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onReload = () => {
    setError(false);
    setLoading(true);
    if (webviewRef.current) webviewRef.current.reload();
  };

  const handleShouldStartLoadWithRequest = (request) => {
    // افتح الروابط الخارجية في المتصفح بدل WebView (مثال: روابط الدفع أو خارجية)
    const isExternal =
      request.url.startsWith("http") &&
      !request.url.startsWith(SITE_URL);
    if (isExternal) {
      Linking.openURL(request.url).catch(() => {});
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>تعذّر تحميل الصفحة.</Text>
          <Button title="أعد المحاولة" onPress={onReload} />
        </View>
      ) : (
        <>
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          )}
          <WebView
            ref={webviewRef}
            source={{ uri: SITE_URL }}
            style={styles.webview}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            startInLoadingState={true}
            originWhitelist={["*"]}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            // Android prop for older RN-webview behavior
            {...(Platform.OS === "android" ? { mixedContentMode: "compatibility" } : {})}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  webview: { flex: 1 },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  errorText: { marginBottom: 12, fontSize: 16, color: "#333" },
});