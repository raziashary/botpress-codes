window.onload = function () {
    let isChatOpen = false;
  
    // Initialize Botpress Web Chat
    window.botpressWebChat.init({
      composerPlaceholder: "Chat with BMW I Hub...",
      botConversationDescription: "iHub Assistant",
      botId: "ec56de9c-27c0-43df-af20-61357562d911",
      hostUrl: "https://cdn.botpress.cloud/webchat/v1",
      messagingUrl: "https://messaging.botpress.cloud",
      clientId: "ec56de9c-27c0-43df-af20-61357562d911",
      hideWidget: true,
      lazySocket: true,
      botName: "BMW",
      avatarUrl: "https://thilakreddy.com/chat-logo.png",
      stylesheet: "https://thilakreddy.com/web-bot.css",
      frontendVersion: "v1",
      theme: "prism",
      themeColor: "#2563eb",
      disableAnimations: true,
    });
  
    setTimeout(function () {
      // Your subsequent code
      window.botpressWebChat.mergeConfig({
        hideWidget: false,
      });
      document.querySelector(".bmw-virtual-assistant").style.display = "block";
    }, 5000);
    let userLocation = {
      latitude: null,
      longitude: null,
      status: null
    };
  
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            userLocation.latitude = position.coords.latitude;
            userLocation.longitude = position.coords.longitude;
            window.botpressWebChat.sendPayload({ type: 'trigger', payload: userLocation })
          },
          function (error) {
            console.error("Error occurred while fetching location: ", error);
            window.botpressWebChat.sendPayload({ type: 'trigger', payload: userLocation })
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        window.botpressWebChat.sendPayload({ type: 'trigger', payload: userLocation })
      }
    }
    window.botpressWebChat.onEvent(
      function (event) {
        if (event.type === "UI.OPENED") {
          document.querySelector(".bmw-virtual-assistant").style.display =
            "none";
          isChatOpen = true;
          window.botpressWebChat.setConfig({
            hideWidget: false,
          });
        } else if (event.type == "UI.CLOSED") {
          isChatOpen = false;
          setTimeout(function () {
            if (!isChatOpen) {
              document.querySelector(".bmw-virtual-assistant").style.display = "block";
            }
          }, 2000);
        } else if (event.type === "TRIGGER") {
          if (event.value.askLocation) {
            getLocation();
          }
        }
      },
      ["UI.OPENED", "UI.CLOSED", "TRIGGER"]
    );
  };
