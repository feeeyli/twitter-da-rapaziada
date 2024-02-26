// ==UserScript==
// @name        Twitter da Rapaziada
// @match       https://twitter.com/*
// @version     2.4
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
            `<div data-testid="tdr-icons" style="display:inline-flex;margin-left:2px;vertical-align:middle;">${item.badges
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
            `<div data-testid="tdr-icons" style="display:inline-flex;margin-left:2px;vertical-align:-20%;">${item.badges
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
            `<div data-testid="tdr-icons" style="display:inline-flex;margin-left:2px;vertical-align:middle;">${item.badges
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

  if (
    $('[role="navigation"].css-175oi2r.r-eqz5dr [data-testid="tdr-link"]')
      .length === 0
  ) {
    $('[role="navigation"].css-175oi2r.r-eqz5dr').append(
      `<a href="https://twitter-da-rapaziada.vercel.app" aria-label="Twitter da rapaziada" role="link" class="css-175oi2r r-6koalj r-eqz5dr r-16y2uox r-1habvwh r-13qz1uu r-rjfia r-1ny4l3l r-1loqt21" data-testid="tdr-link" target="_blank">
       <style>
         [role="navigation"].css-175oi2r.r-eqz5dr [data-testid="tdr-link"] span {
           font-size: 18.5px !important;
         }

         [role="navigation"].css-175oi2r.r-eqz5dr [data-testid="tdr-link"]:hover > div.css-175oi2r.r-sdzlij.r-dnmrzs.r-1awozwy.r-18u37iz.r-1777fci.r-xyw6el.r-o7ynqc.r-6416eg {
           background-color: rgb(15, 20, 25, 0.1) !important;
         }

         [role="navigation"].css-175oi2r.r-eqz5dr > .css-175oi2r.r-6koalj.r-eqz5dr.r-16y2uox.r-1habvwh.r-13qz1uu.r-rjfia.r-1ny4l3l.r-1loqt21 > div {
           padding-block: 10px !important;
         }

         @media (max-width: 1298px) {
           [role="navigation"].css-175oi2r.r-eqz5dr [data-testid="tdr-link"] .css-1rynq56.r-dnmrzs.r-1udh08x.r-3s2u2q.r-bcqeeo.r-qvutc0.r-37j5jr.r-adyw6z.r-135wba7.r-16dba41.r-88pszg.r-1joea0r {
             display: none;
             margin: 0 !important;
           }
         }

         @media (max-width: 500px) {
           [role="navigation"].css-175oi2r.r-eqz5dr [data-testid="tdr-link"] {
             display: none;
           }
         }
       </style>
       <div class="css-175oi2r r-sdzlij r-dnmrzs r-1awozwy r-18u37iz r-1777fci r-xyw6el r-o7ynqc r-6416eg">
         <div class="css-175oi2r">
           <svg width="26.25px" height="26.25px" viewBox="0 0 105 112" fill="none" xmlns="http://www.w3.org/2000/svg" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-lwhw9o r-cnnz9e">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M41.7705 1.32886C29.6155 4.27186 23.8585 8.48486 12.6365 22.6519C3.85945 33.7319 2.76045 37.1479 5.50245 44.8179C6.36845 47.2409 6.54245 50.3019 6.04245 54.3179C5.63745 57.5769 5.26545 62.9429 5.21645 66.2429C5.15345 70.5279 4.41445 73.6489 2.63245 77.1619C-0.810547 83.9489 -0.885546 94.3859 2.46245 100.998C4.47545 104.974 4.61445 105.904 3.49745 107.917C1.67345 111.205 1.81845 111.743 4.52845 111.743C6.18845 111.743 7.09545 111.041 7.49645 109.447C8.19845 106.646 15.0365 98.6949 15.0945 100.61C15.1215 101.478 15.8665 101.785 17.1365 101.453C18.2365 101.166 19.1365 101.231 19.1365 101.599C19.1365 101.968 20.1495 102.713 21.3865 103.256C22.8085 103.88 23.9775 105.623 24.5625 107.993L25.4895 111.743H43.4195C60.1005 111.743 61.3015 111.621 60.6415 109.993C58.0595 103.624 57.9955 102.93 59.7925 100.832C60.7755 99.6829 62.1555 98.7429 62.8585 98.7429C63.5615 98.7429 64.1365 98.2369 64.1365 97.6179C64.1365 96.9049 65.2195 96.7099 67.0975 97.0849C68.7265 97.4109 70.3285 97.2409 70.6585 96.7079C71.7185 94.9919 75.3875 97.6289 82.2965 105.07C85.9585 109.015 89.2615 111.94 89.6365 111.57C90.0105 111.199 88.4764 108.458 86.2264 105.479C82.3954 100.405 82.1365 99.6409 82.1365 93.4309C82.1365 82.2199 76.6784 72.9549 67.9184 69.2959C60.7874 66.3169 48.4485 68.0309 41.0485 73.0279L37.6365 75.3319L31.8255 72.3389C25.7795 69.2249 18.8335 68.3979 12.7315 70.0649L9.82745 70.8589L10.4485 60.6679C10.7895 55.0629 11.2705 50.2749 11.5175 50.0289C11.7635 49.7829 12.8745 50.0669 13.9855 50.6619C16.9915 52.2709 27.7425 51.9689 33.6395 50.1109C38.7795 48.4899 38.8685 48.4989 45.7275 51.3279C51.4295 53.6799 54.1215 54.1839 61.1365 54.2109C68.5055 54.2389 70.4125 53.8619 75.4715 51.3779C83.2465 47.5599 85.3705 44.1629 84.8675 36.3479C84.5285 31.0849 84.1035 30.1009 80.9005 27.1659C76.7915 23.3999 66.2815 19.7429 59.5665 19.7429C57.1685 19.7429 53.1005 20.4579 50.5255 21.3319C46.6145 22.6599 45.1315 22.7219 41.5045 21.7059C38.9355 20.9869 33.7155 20.6719 28.7125 20.9339L20.2605 21.3779L22.1515 18.7219C25.5195 13.9909 26.9905 13.3309 34.1625 13.3309C40.4155 13.3309 40.9065 13.1809 40.0265 11.5369C39.4885 10.5319 37.8725 9.70586 36.3515 9.65886C30.5765 9.47886 42.1475 5.55286 50.0405 5.01386C72.9205 3.44986 91.4275 16.5039 94.1885 36.1529C94.6585 39.5029 95.5095 53.7179 96.0795 67.7429C96.6495 81.7679 97.3985 97.4059 97.7445 102.493L98.3745 111.743H101.368C104.202 111.743 104.331 111.569 103.768 108.493C103.441 106.706 102.709 94.4429 102.14 81.2429C100.266 37.7139 99.7245 32.6789 96.0685 24.7459C92.4705 16.9399 85.3895 9.44886 78.0635 5.69686C67.3765 0.223857 53.3245 -1.46714 41.7705 1.32886ZM55.1415 10.4519C52.0465 12.6199 52.7045 13.9149 56.5365 13.1959C58.4065 12.8449 63.1925 13.0629 67.1725 13.6809C75.3905 14.9559 77.0855 14.4549 71.8945 12.2859C65.8275 9.75086 57.4515 8.83386 55.1415 10.4519ZM40.5625 24.1019L43.2325 25.8519L40.9535 29.5389C39.2365 32.3169 38.6585 34.7949 38.6075 39.5909C38.5465 45.2769 38.2775 46.1019 36.0885 47.3139C32.5775 49.2589 31.5495 49.0489 33.5815 46.8039C36.3455 43.7489 35.8895 37.7879 32.6805 35.0269C28.6345 31.5469 20.1995 32.5079 18.6325 36.6279C18.1395 37.9219 18.2685 37.9949 19.2775 36.9929C20.7375 35.5429 24.1365 35.3109 24.1365 36.6609C24.1365 38.9399 22.7645 40.7429 21.0295 40.7429C19.9885 40.7429 19.1365 40.2929 19.1365 39.7429C19.1365 39.4866 19.0388 39.2521 18.8788 39.0746C18.6954 38.8712 18.4302 38.7429 18.1365 38.7429C17.6844 38.7429 17.3847 39.0254 17.2202 39.5C16.6325 41.1956 17.7705 45.3427 19.8535 47.8179L22.5705 51.0469L18.6035 50.3519C13.4485 49.4489 8.13645 44.0559 8.13645 39.7259C8.13645 29.3419 19.0165 21.3769 32.2645 22.0619C35.4915 22.2289 39.0315 23.0989 40.5625 24.1019ZM71.6134 23.8579C73.8284 24.4729 77.2634 26.6349 79.3634 28.7349C82.8014 32.1719 83.1365 32.9909 83.1365 37.9379C83.1365 42.5589 82.7265 43.7609 80.3865 45.9969C76.7805 49.4429 69.4865 52.6929 65.2975 52.7209L61.9585 52.7429L64.5475 49.6659C70.1695 42.9849 65.8675 33.7429 57.1365 33.7429C49.1575 33.7429 44.7395 41.6239 48.5855 48.9979C49.9855 51.6809 49.9655 51.7229 47.8295 50.6259C46.6235 50.0059 44.3995 48.3439 42.8865 46.9339C40.5725 44.7749 40.1365 43.5499 40.1365 39.2039C40.1365 28.8959 47.7935 22.7379 60.5985 22.7489C64.4695 22.7519 69.4264 23.2509 71.6134 23.8579ZM55.1365 38.1719C55.1365 40.8739 52.5245 44.0359 50.7705 43.4589C49.1465 42.9249 48.7685 38.8919 50.1825 37.1879C52.1675 34.7959 55.1365 35.3859 55.1365 38.1719ZM25.7365 40.3429C25.3805 41.2699 24.8645 41.8039 24.5895 41.5289C24.3145 41.2539 24.3805 40.2699 24.7365 39.3429C25.0925 38.4159 25.6085 37.8819 25.8835 38.1569C26.1585 38.4319 26.0925 39.4159 25.7365 40.3429ZM57.5765 41.1249C57.2155 42.5649 56.5415 43.7429 56.0805 43.7429C55.6185 43.7429 55.7195 42.3699 56.3045 40.6919C57.5695 37.0629 58.5155 37.3849 57.5765 41.1249ZM35.3865 61.5169C25.6755 61.6809 19.1365 62.1839 19.1365 62.7669C19.1365 63.8629 46.3295 63.9049 57.6365 62.8269L64.6365 62.1599L58.1365 61.7009C54.5615 61.4489 44.3245 61.3659 35.3865 61.5169Z" fill="black"/>
           </svg>
         </div>
         <div dir="ltr" class="css-1rynq56 r-dnmrzs r-1udh08x r-3s2u2q r-bcqeeo r-qvutc0 r-37j5jr r-adyw6z r-135wba7 r-16dba41 r-88pszg r-1joea0r" style="text-overflow: unset; color: rgb(15, 20, 25);">
           <span class="css-1qaijid r-bcqeeo r-qvutc0 r-poiln3" style="text-overflow: unset;text-wrap: balance;">Twitter da rapaziada</span>
         </div>
       </div>
     </a>`
    );
  }
}

// run()
getData();
setInterval(run, 1000 * 0.5);
