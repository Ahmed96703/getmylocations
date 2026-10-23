---
title: "Haversine vs Vincenty: How Much Error Does a Sphere Add?"
description: "Haversine is off by up to 0.56%. We measured 200,000 routes against Vincenty and GeographicLib, with errors by direction and latitude."
url: https://getmylocations.com/blog/haversine-vs-vincenty
---

# Haversine vs Vincenty: How Much Error Does a Sphere Add?

A

Ahmed Anwar

October 14, 2026·7 min read

-   distance
-   geodesy
-   developers

* * *

Quick answer

Haversine treats the Earth as a sphere, so its distances are off by up to about half a percent: in our test of 200,000 random routes, the worst cases were 0.56% too long and 0.45% too short. Vincenty’s formulae use the real, slightly flattened shape (the WGS 84 ellipsoid) and are accurate to about half a millimetre, but can fail for points on nearly opposite sides of the Earth. Use haversine for ranking or rough distances; use an ellipsoidal method when the number itself matters.

Every distance calculator has to pick a model of the Earth. The quick choice is the haversine formula on a sphere; the careful choice is an ellipsoidal method such as Vincenty’s. Most articles stop at “Vincenty is more accurate.” This one measures by how much, in which directions, and where Vincenty itself breaks, using the same code that runs our [distance calculator](https://getmylocations.com/distance-calculator).

## What each formula assumes

-   **Haversine** computes the great-circle distance on a perfect sphere. Our code uses the mean Earth radius of 6,371,008.8 m. One radius cannot fit a planet that is wider at the equator (6,378.137 km) than it is tall at the poles (6,356.752 km), so the [formula cannot be guaranteed better than about 0.5%](https://en.wikipedia.org/wiki/Haversine_formula).
-   **Vincenty’s formulae** (Thaddeus Vincenty, _Survey Review_, April 1975) solve the distance on the WGS 84 ellipsoid that GPS uses, by iteration. They are [accurate to within about 0.5 mm](https://en.wikipedia.org/wiki/Vincenty%27s_formulae) on the ellipsoid.

## How big is the difference on real routes?

Straight-line (geodesic) distances, Vincenty on WGS 84 versus haversine on the mean-radius sphere:

| Route | Vincenty (km) | Haversine (km) | Difference | Error |
| --- | --- | --- | --- | --- |
| London → Paris | 343.9 | 343.6 | −0.4 km | −0.11% |
| Lahore → Karachi | 1,032.2 | 1,033.0 | +0.8 km | +0.08% |
| Oslo → Longyearbyen (Svalbard) | 2,049.8 | 2,043.4 | −6.4 km | −0.31% |
| New York → Los Angeles | 3,944.4 | 3,935.8 | −8.7 km | −0.22% |
| Sydney → Santiago | 11,369.0 | 11,346.7 | −22.3 km | −0.20% |

Kilometres off on intercontinental routes, hundreds of metres on short ones. For a flight-time estimate that is noise. For anything that is billed, surveyed or legally measured, it is not.

## Direction and latitude decide the sign of the error

The error is not a fixed percentage. It depends on which way you travel and how far from the equator you are, because the ellipsoid curves differently north–south than east–west. Here is the haversine error over exactly 100 km:

| Starting latitude | 100 km due north | 100 km due east |
| --- | --- | --- |
| 0° | +561 m | −112 m |
| 30° | +302 m | −195 m |
| 45° | +49 m | −279 m |
| 60° | −202 m | −363 m |
| 80° | −419 m | −436 m |

Near the equator, haversine overstates north–south distances by over half a percent; at high latitudes it understates distances in every direction. That is why a single “correction factor” for haversine does not work.

## The worst case we could find

We compared the two methods on 200,000 random pairs of points spread evenly over the globe (routes shorter than 1 km excluded). The largest errors:

-   **Too long by 0.56%:** a 537 km route running almost due north–south across the equator, near New Guinea.
-   **Too short by 0.45%:** a 486 km route near the North Pole.

Both match the known shape of the problem: the sphere is too small to match the equator’s north–south curvature and too large near the poles. Only one of the 200,000 Vincenty runs failed to converge, which brings us to its weak spot.

## Vincenty’s weak spot: points on opposite sides of the Earth

Vincenty’s inverse method iterates, and for nearly antipodal points it can converge slowly or not at all. A standard failing example is (0°, 0°) to (0.5°, 179.7°): our implementation gives up after 200 iterations. The correct distance, from Charles Karney’s 2013 algorithm in the [GeographicLib](https://geographiclib.sourceforge.io/) library, is 19,944.127 km; haversine gives 19,950.277 km, about 6 km too long.

When Vincenty does not converge, our distance calculator falls back to the haversine result and labels it as the sphere distance rather than hiding the switch. Karney’s method avoids the problem entirely and is the better choice for new code that must handle every pair of points.

## Which should you use?

-   **Haversine:** sorting places by distance, “within 5 km” filters, rough travel estimates, anything where 0.5% does not change the decision. It is short, fast and never fails.
-   **Vincenty:** when you need the actual number to metre-level accuracy and your points are not near-antipodal, or when you are matching survey or GIS software that uses it.
-   **Karney (GeographicLib):** production geodesy, every pair of points including the awkward ones, and about a thousand times more accurate than Vincenty.

Remember that GPS coordinates themselves are only good to a few metres (see [GPS vs IP accuracy](https://getmylocations.com/gps-vs-ip-accuracy)), so for short distances between two phone readings the formula is rarely the biggest source of error.

## Haversine in a few lines

```
const R = 6371008.8; // mean Earth radius in metres (IUGG)
const rad = (d) => (d * Math.PI) / 180;

function haversine(lat1, lon1, lat2, lon2) {
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
```

For the ellipsoid, use a maintained library rather than retyping Vincenty: GeographicLib has versions for JavaScript (`geographiclib-geodesic`), Python, C++ and more.

## How we checked these numbers

The route and 100 km tables are computed from the distance calculator’s source every time this site is built. For the random test we also compared our Vincenty implementation with GeographicLib on every pair: the largest disagreement was 0.08 mm. The test ran on 14 October 2026 with a fixed random seed, so it can be repeated exactly.

Try any pair yourself in the [distance calculator](https://getmylocations.com/distance-calculator), which shows both results side by side, or convert coordinates first with the [coordinates converter](https://getmylocations.com/coordinates-converter). If latitude and longitude still trip you up, start with [latitude vs longitude explained](https://getmylocations.com/blog/latitude-vs-longitude-explained).

Sponsored

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
