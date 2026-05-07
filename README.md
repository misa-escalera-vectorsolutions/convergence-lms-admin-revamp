# Convergence LMS Administration Revamp

This prototype is a visual refresh of the existing Convergence LMS Administration page, not a workflow redesign.

## What Changed

- The legacy Administration shell is preserved: top navigation, left navigation rail, environment banner, help action, and six quick-access admin tiles.
- The presentation is updated with Vector components and theme tokens for improved spacing, hierarchy, and responsiveness.
- Tile data and navigation labels are generated from mock data in `data.js`.

## Files

- `index.html` contains the refreshed Administration layout.
- `styles.css` applies the updated visual treatment.
- `data.js` holds the legacy-equivalent navigation and quick-access actions.
- `app.js` binds the data and powers tile/detail interaction.
- `DESIGN-SPEC.md` explains the visual refresh approach.
- `COMPONENT-MAPPING.md` maps the old UI to the refreshed Vector implementation.

## Interaction

- Click any quick-access tile to view its detail drawer.
- Use Help for notification feedback.

The interaction is intentionally lightweight so the page remains functionally equivalent to the legacy dashboard.
