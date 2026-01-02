
export function registerSettingsApi(app) {
  app.get("/api/settings", (req, res) => {
    res.json({
      primaryColor: "#2563eb",
      fontFamily: "system-ui",
      kofiUser: ""
    });
  });
}
