// This IFEE is used to keep the code out of the global scope and register the links to the analytics service.
(() => {
  const CONFIG = {
    ANALYTICS_URL: '%%ANALYTICS_URL%%',
    JOURNEY_ID: null,
  };

  const utils = {
    getLink(href: string) {
      const url = encodeURIComponent(href);
      const uuid = CONFIG.JOURNEY_ID;
      const source = window.location.href;
      return `${CONFIG.ANALYTICS_URL}/report?url=${url}&uuid=${uuid}&source=${source}`;
    },
  };

  const app = {
    async init() {
      await this.registerJourney();
      this.cacheElements();
      this.registerLinks();
    },
    async registerJourney() {
      const setJourneyId = (journeyId: string) => {
        if (journeyId && journeyId.length < 5) return false;
        CONFIG.JOURNEY_ID = journeyId;
        localStorage.setItem('journeyId', journeyId);
        return true;
      };
      let journeyId = localStorage.getItem('journeyId');
      const newJourneyId1Res = await fetch(
        `${CONFIG.ANALYTICS_URL}/register?journeyId=${journeyId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'plain/text',
          },
        },
      );
      const newJourneyId1 = await newJourneyId1Res.text();
      if (newJourneyId1 && typeof newJourneyId1 === 'string') {
        journeyId = newJourneyId1;
        const res1 = setJourneyId(journeyId);
        if (res1) return;
      }

      const newJourneyId2Res = await fetch(`${CONFIG.ANALYTICS_URL}/register`, {
        method: 'GET',
        headers: {
          'Content-Type': 'plain/text',
        },
      });
      const newJourneyId2 = await newJourneyId2Res.text();
      if (newJourneyId2 && typeof newJourneyId2 === 'string') {
        journeyId = newJourneyId2;
      }
      setJourneyId(journeyId);
    },
    cacheElements() {
      this.$links = document.querySelectorAll('a');
    },
    registerLinks() {
      this.$links.forEach(($link) => {
        const currentHref = $link.href;
        $link.href = utils.getLink(currentHref);
      });
    },
  };

  void app.init();
})();
