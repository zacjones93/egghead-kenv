// Menu: egghead Admin Login As User
// Author: Ian Jones
let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");
let { siteChoices, siteData, eggheadAuthHeaders } = await lib("egghead");

const site = await arg("Which site do you want to log into?", siteChoices);
const siteUrl = site.httpUrl;
const siteName = site.siteName;
const email = await arg("Whats the email of the user you want to view as?");
//const email = "zac@egghead.io";

const userData = await get("https://app.egghead.io/api/v1/users/search", {
  params: { q: email },
  headers: eggheadAuthHeaders,
}).then((r) => r.data);

const purchasedFromSite = _.chain(userData)
  .get("users.[0].purchased", [])
  .filter({ site: siteName })
  .value();

if (purchasedFromSite.length === 0 && siteName !== "egghead.io") {
  setPlaceholder(`This user does not have a purchase from ${site.name}`);
  await wait(3000);
  exit(0);
}

let continueScript = true;
if (siteName !== "egghead.io") {
  const pppCheck = _.reduce(
    purchasedFromSite,
    (pppObject, currentSellablePurchase) => {
      const currentPurchasePPPCountry = _.get(
        currentSellablePurchase,
        "coupon.restricted_to_country_name",
        false
      );
      const upgradedFromPurchase = _.get(
        currentSellablePurchase,
        "upgraded_from_purchase_id"
      );
      if (currentPurchasePPPCountry) {
        pppObject.country = currentPurchasePPPCountry;
      }
      if (upgradedFromPurchase) {
        pppObject.upgraded = true;
      }

      return pppObject;
    },
    { country: undefined, upgraded: false }
  );

  if (pppCheck.country && !pppCheck.upgraded) {
    continueScript = await arg(
      `This user is from ${pppCheck.country}, are you connected to a vpn there?`,
      [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ]
    );
  }
}

if (!continueScript) {
  exit(0);
}

const signInUrl = `${siteUrl}?show-as-user=${email}#access_token=${eggheadUserToken}`;

copy(signInUrl);

await applescript(String.raw`
activate application "Google Chrome"

tell application "System Events" to ¬
    click menu item "New Incognito Window" of ¬
        menu "File" of menu bar 1 of ¬
        application process "Google Chrome"

tell application "Google Chrome" to ¬
    set URL of active tab of ¬
        front window to "${signInUrl}"
`);
