// ==UserScript==
// @name        Twitter da Rapaziada
// @match       https://twitter.com/*
// @version     2.1
// @author      feyli
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
// @require     https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @icon        https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_65bde2aab77a4f2ab005f54ea73b8d47/default/light/3.0
// @downloadURL	https://github.com/feeeyli/twitter-da-rapaziada/raw/main/index.user.js
// @updateURL		https://github.com/feeeyli/twitter-da-rapaziada/raw/main/index.user.js
// @grant       GM.xmlHttpRequest
// @connect     *
// ==/UserScript==

/**
 * @type {{
 *  username: string,
 *  verified: boolean,
 *  "cellbit-logo": boolean,
 *  blood: boolean,
 *  knowledge: boolean,
 *  death: boolean,
 *  energy: boolean
 * }[]}
 */
let rapaziada = [];

const badges = /** @type {const} */ ([
  {
    name: "verified",
    alt: "cellA",
    image:
      "https://pbs.twimg.com/media/GGjoSmTWIAA2ojP?format=png&name=120x120",
  },
  {
    name: "cellbit-logo",
    alt: "C",
    image:
      "https://pbs.twimg.com/media/GG5WqxoXMAAaRFP?format=png&name=120x120",
  },
  {
    name: "blood",
    alt: "Sangue",
    image:
      "https://pbs.twimg.com/media/GGosXatXAAA0CRQ?format=png&name=120x120",
  },
  {
    name: "knowledge",
    alt: "Conhecimento",
    image:
      "https://pbs.twimg.com/media/GGpoA1_XQAAoWuc?format=png&name=120x120",
  },
  {
    name: "death",
    alt: "Morte",
    image:
      "https://pbs.twimg.com/media/GGpnu6eWgAA8d8Q?format=png&name=120x120",
  },
  {
    name: "energy",
    alt: "Energia",
    image:
      "https://pbs.twimg.com/media/GGpoJd9WcAANjlK?format=png&name=120x120",
  },
]);

/**
 *
 * @param {{ size?: number, alt?: string, src?: string, style?: string }} options
 * @returns {string}
 */
const icon = ({
  size = 22,
  alt = "",
  src = "",
  style = "",
}) => `<div dir="ltr" class="r-13hce6t css-1rynq56 r-bcqeeo r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-xoduu5 r-18u37iz r-1q142lx" style="text-overflow: unset; color: rgb(15, 20, 25);">
<span class="css-1qaijid r-bcqeeo r-qvutc0 r-poiln3 r-1awozwy r-xoduu5" style="text-overflow: unset;">
  <img src="${src}" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-1plcrui r-lrvibr r-1cvl2hr" style="width:${size}px;height:${size}px;object-fit:contain;border-radius:2.5px;${style}" alt="${alt}" title="${alt}">
</span>
</div>`;

/**
 *
 * @param {{ size?: number, alt?: string, src?: string, style?: string }} options
 * @returns {string}
 */
const iconImg = ({ size = 24, alt = "", src = "", style = "" }) =>
  `<img src="${src}" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-1plcrui r-lrvibr r-1cvl2hr r-dflpy8 r-zw8f10 r-sjv1od r-10akycc r-h9hxbl" style="width:${size}px;height:${size}px;object-fit:contain;border-radius:2.5px;${style}" alt="${alt}" title="${alt}">`;

/**
 *
 * @param {{ size?: number, alt?: string, style?: string }} options
 * @returns {string}
 */
const cellbitLogo = ({
  size = 20,
  alt = "C",
  style = "",
}) => `<svg width="${size}" height="${size}" viewBox="0 0 126 220" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:text-bottom;${style}" title="${alt}">
<path fill-rule="evenodd" clip-rule="evenodd" d="M121.337 136.18C118.693 137.384 112.127 140.136 89.6427 149.465L77.9142 154.331L77.4969 158.324C77.2673 160.52 77.0796 165.128 77.0796 168.565C77.0796 177.137 76.3655 178.098 68.4943 180.112C64.9684 181.014 58.1794 179.901 55.886 178.044C53.8801 176.419 52.4552 172.734 52.4552 169.17C52.4552 167.533 52.1744 166.019 51.831 165.807C51.2693 165.46 45.5331 167.424 40.0765 169.831C38.9418 170.331 34.15 172.224 29.4281 174.036C20.0349 177.642 16.2235 179.159 14.1877 180.1C13.4556 180.439 10.6105 181.588 7.8652 182.654C1.96134 184.945 1.6745 185.65 3.80018 192.648C5.53254 198.352 9.27012 204.114 14.0878 208.508C23.1676 216.789 35.9949 219.944 60.8076 219.999C88.076 220.06 104.304 216.532 113.343 208.576C116.935 205.414 121.13 198.487 122.532 193.401C123.088 191.388 123.9 188.543 124.337 187.078C124.857 185.337 125.252 176.123 125.478 160.439C125.868 133.385 125.984 134.064 121.337 136.18Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.620869 89.1547C0.0751398 89.8116 -0.0845865 101.291 0.0398663 130.907C0.201588 169.433 0.278792 171.766 1.39354 171.981C2.39782 172.174 8.03014 170.064 16.1841 166.441C17.2822 165.953 20.1273 164.799 22.5066 163.878C24.8858 162.956 30.1268 160.82 34.1532 159.131C38.1797 157.443 43.2709 155.357 45.4671 154.497C52.8398 151.611 55.7827 150.085 55.7827 149.152C55.7827 148.641 54.2108 147.009 52.2887 145.523C50.3674 144.038 43.7035 138.901 37.4809 134.106C31.2582 129.312 25.8968 125.134 25.5667 124.82C25.1148 124.392 32.8302 115.022 36.5005 111.542C36.6935 111.359 39.3703 108.364 42.4483 104.886C45.5264 101.409 48.2357 98.4142 48.4686 98.2311C50.2502 96.8335 55.7827 90.0319 55.7827 89.2393C55.7827 88.3774 52.2302 88.2483 28.5775 88.2483C6.43487 88.2483 1.23315 88.4167 0.620869 89.1547Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M38.4792 0.190283C20.3957 2.55954 7.05924 14.0165 3.45211 30.2819C1.61926 38.5457 1.25322 43.3401 1.23192 59.3866L1.20996 75.4483L2.70739 75.8496C4.66136 76.3727 49.0038 76.3727 50.9578 75.8496C52.4519 75.4489 52.4552 75.4183 52.4566 61.0504C52.4572 48.659 52.6196 46.335 53.6212 44.371C55.6457 40.3998 57.7767 39.3623 64.4426 39.1014C69.5711 38.9004 70.6912 39.0641 72.98 40.3506C74.4288 41.1652 75.9482 42.467 76.3568 43.2443C76.8247 44.1348 77.1568 50.2596 77.2553 59.8218C77.3864 72.4588 77.5787 75.0922 78.4106 75.618C79.5154 76.3161 121.688 76.5131 124.232 75.8323L125.796 75.413L125.484 51.0502C125.229 31.0952 124.979 26.1084 124.106 23.4863C120.032 11.2493 112.1 5.21032 95.3815 1.6145C89.3625 0.320059 86.4362 0.16899 64.7674 0.0345545C51.5901 -0.0479703 39.7604 0.0225708 38.4792 0.190283Z" fill="currentColor"/>
</svg>`;

const tags = /** @type {const} */ ([
  "#AOP",
  "#OPI",
  "#OSNF",
  "#OPD",
  "#OPC",
  "#OSNI",
  "#SDOL",
  "#OPQ",
  "#OrdemParanormal",
  "Ordem Paranormal",
]);

const ordemAccounts = /** @type {const} */ ([
  "OrdemParanormal",
  "ParanormalOrder",
  "OrdemUpdates",
  "OrdemUpdatesEN",
  "OrdemLoja",
]);

async function getData() {
  const fromStorage = sessionStorage.getItem("@TdR/rapazaida");

  if (fromStorage !== null) {
    rapaziada = JSON.parse(fromStorage);

    console.log("@TdR / reuse data from sessionStorage");

    return;
  }

  GM.xmlHttpRequest({
    method: "GET",
    url: "https://twitter-da-rapaziada.vercel.app/api/users",
    responseType: "json",
    onload: (response) => {
      if (response.status === 200) {
        console.log("@TdR / new data received");

        sessionStorage.setItem(
          "@TdR/rapazaida",
          JSON.stringify(response.response.data)
        );
        rapaziada = response.response.data;
      } else {
        console.log(response);
      }
    },
  });
}

function run() {
  if (typeof rapaziada !== "undefined" && rapaziada.length > 0) {
    Array.from($('[data-testid="User-Name"]:contains(@)'))
      .filter((item) => !$(item).find('[data-testid="tdr-icons"]')[0])
      .filter((item) => {
        try {
          return rapaziada.some(
            (r) =>
              (/@(\w+)·/i.exec(item.textContent) ??
                item.textContent.split("@"))[1].toLocaleLowerCase() ===
              r.username
          );
        } catch (err) {
          return false;
        }
      })
      .map((item) => {
        const user = rapaziada.find(
          (r) =>
            (/@(\w+)·/i.exec(item.textContent) ??
              item.textContent.split("@"))[1].toLocaleLowerCase() === r.username
        );

        return {
          el: item,
          badges: ordemAccounts.includes(user.username)
            ? [
                badges[1],
                // {
                //   alt: "Ordem Paranormal",
                //   image:
                //     "https://pbs.twimg.com/media/GG9TPrJXkAAkHM4?format=png&name=120x120",
                //   name: "paranormal-order",
                // },
              ]
            : badges.filter((badge) => user?.[badge.name] ?? false),
        };
      })
      .forEach((item) => {
        $(item.el)
          .find("> div:not(:contains(@))")
          .append(
            `<div data-testid="tdr-icons" style="display:inline-flex;margin-left:2px;">${item.badges
              .map((badge) => {
                if (badge.name !== "cellbit-logo")
                  return iconImg({
                    alt: badge.alt,
                    src: badge.image,
                    size: 20,
                  });

                return cellbitLogo({});
              })
              .join("")}</div>`
          );
      });
    Array.from($('[data-testid="UserName"]:contains(@)'))
      .filter((item) => !$(item).find('[data-testid="tdr-icons"]')[0])
      .filter((item) =>
        rapaziada.some(
          (r) =>
            item.textContent
              .replace("Segue você", "")
              .split("@")[1]
              .toLocaleLowerCase() === r.username
        )
      )
      .map((item) => {
        const user = rapaziada.find(
          (r) =>
            item.textContent
              .replace("Segue você", "")
              .split("@")[1]
              .toLocaleLowerCase() === r.username
        );

        return {
          el: item,
          badges: ordemAccounts.includes(user.username)
            ? [
                badges[1],
                // {
                //   alt: "Ordem Paranormal",
                //   image:
                //     "https://pbs.twimg.com/media/GG9TPrJXkAAkHM4?format=png&name=120x120",
                //   name: "paranormal-order",
                // },
              ]
            : badges.filter((badge) => user?.[badge.name] ?? false),
        };
      })
      .forEach((item) =>
        $(item.el)
          .find(
            ".css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-1vr29t4.r-1awozwy.r-6koalj.r-1udh08x > span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3"
          )
          .append(
            `<div data-testid="tdr-icons" style="display:inline-flex;margin-left:2px;">${item.badges
              .map((badge) => {
                if (badge.name !== "cellbit-logo")
                  return iconImg({
                    alt: badge.alt,
                    src: badge.image,
                    size: 24,
                  });

                return cellbitLogo({ size: 24 });
              })
              .join("")}</div>`
          )
      );

    Array.from(
      $(
        '[data-testid="UserCell"]:contains(@) > div > div > div > .css-175oi2r.r-1wbh5a2.r-dnmrzs.r-1ny4l3l'
      )
    )
      .filter((item) => !$(item).find('[data-testid="tdr-icons"]')[0])
      .filter((item) =>
        rapaziada.some(
          (r) =>
            item.textContent
              .replace("Segue você", "")
              .split("@")[1]
              .toLocaleLowerCase() === r.username
        )
      )
      .map((item) => {
        const user = rapaziada.find(
          (r) =>
            item.textContent
              .replace("Segue você", "")
              .split("@")[1]
              .toLocaleLowerCase() === r.username
        );

        return {
          el: item,
          badges: ordemAccounts.includes(user.username)
            ? [
                badges[1],
                // {
                //   alt: "Ordem Paranormal",
                //   image:
                //     "https://pbs.twimg.com/media/GG9TPrJXkAAkHM4?format=png&name=120x120",
                //   name: "paranormal-order",
                // },
              ]
            : badges.filter((badge) => user?.[badge.name] ?? false),
        };
      })
      .forEach((item) =>
        $(item.el)
          .find(
            ".css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-b88u0q.r-1awozwy.r-6koalj.r-1udh08x.r-3s2u2q > span.css-1qaijid.r-dnmrzs.r-1udh08x.r-3s2u2q.r-bcqeeo.r-qvutc0.r-poiln3"
          )
          .append(
            `<div data-testid="tdr-icons" style="display:inline-flex;margin-left:2px;">${item.badges
              .map((badge) => {
                if (badge.name !== "cellbit-logo")
                  return iconImg({
                    alt: badge.alt,
                    src: badge.image,
                    size: 20,
                  });

                return cellbitLogo({});
              })
              .join("")}</div>`
          )
      );
  }
}

// run()
getData();
setInterval(run, 1000 * 0.5);
