// ==UserScript==
// @name        Twitter da Rapaziada
// @match       https://twitter.com/*
// @version     1.8
// @author      feyli
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
// @require     https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @require     https://gist.github.com/feeeyli/5c8e5d795e7cf5d164ab4f46ab5d2f1c/raw
// @icon        https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_65bde2aab77a4f2ab005f54ea73b8d47/default/light/3.0
// @downloadURL		https://github.com/feeeyli/twitter-da-rapaziada/raw/main/index.user.js
// @updateURL		https://github.com/feeeyli/twitter-da-rapaziada/raw/main/index.user.js
// ==/UserScript==

const icon = (
  size = 22,
  cn
) => `<div dir="ltr" class="r-13hce6t css-1rynq56 r-bcqeeo r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-xoduu5 r-18u37iz r-1q142lx" style="text-overflow: unset; color: rgb(15, 20, 25);">
  <span class="css-1qaijid r-bcqeeo r-qvutc0 r-poiln3 r-1awozwy r-xoduu5" style="text-overflow: unset;">
    <img src="https://pbs.twimg.com/media/GGjoSmTWIAA2ojP?format=png&name=120x120" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-1plcrui r-lrvibr r-1cvl2hr" data-testid="icon-rapaziada" style="width:${size}px;height:${size}px;" alt="cellA" title="cellA">
  </span>
</div>`;

const iconImg = (size = 24) =>
  `<span class="css-1qaijid r-bcqeeo r-qvutc0 r-poiln3" style="text-overflow: unset;"> </span><img src="https://pbs.twimg.com/media/GGjoSmTWIAA2ojP?format=png&name=120x120" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-1plcrui r-lrvibr r-1cvl2hr r-dflpy8 r-zw8f10 r-sjv1od r-10akycc r-h9hxbl" data-testid="icon-rapaziada" style="width:${size}px;height:${size}px;" alt="cellA" title="cellA">`;

const tags = [
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
];

function run() {
  if (typeof rapaziada !== "undefined") {
    Array.from($('[data-testid="User-Name"]:contains(@)'))
      .filter((item) => !$(item).find('[data-testid="icon-rapaziada"]')[0])
      .filter(
        (item) =>
          tags.some((r) =>
            item.textContent.toLocaleLowerCase().includes(r.toLocaleLowerCase())
          ) || rapaziada.some((r) => item.textContent.includes(r))
      )
      .forEach((item) =>
        $(item).find("> div:not(:contains(@))").append(icon())
      );
    Array.from($('[data-testid="UserName"]:contains(@)'))
      .filter((item) => !$(item).find('[data-testid="icon-rapaziada"]')[0])
      .filter(
        (item) =>
          tags.some((r) =>
            item.textContent.toLocaleLowerCase().includes(r.toLocaleLowerCase())
          ) || rapaziada.some((r) => item.textContent.includes(r))
      )
      .forEach((item) =>
        $(item)
          .find(
            ".css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-adyw6z.r-135wba7.r-1vr29t4.r-1awozwy.r-6koalj.r-1udh08x > span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3"
          )
          .append(iconImg())
      );
    Array.from($('[data-testid="UserCell"]:contains(@)'))
      .filter((item) => !$(item).find('[data-testid="icon-rapaziada"]')[0])
      .filter(
        (item) =>
          tags.some((r) =>
            item.textContent.toLocaleLowerCase().includes(r.toLocaleLowerCase())
          ) || rapaziada.some((r) => item.textContent.includes(r))
      )
      .forEach((item) =>
        $(item)
          .find(
            ".css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-b88u0q.r-1awozwy.r-6koalj.r-1udh08x.r-3s2u2q > span.css-1qaijid.r-dnmrzs.r-1udh08x.r-3s2u2q.r-bcqeeo.r-qvutc0.r-poiln3"
          )
          .append(iconImg(22))
      );
  }
}

// run()
setInterval(run, 500);
