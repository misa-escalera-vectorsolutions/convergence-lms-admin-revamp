# Convergence LMS Administration Refresh Spec

## Intent

Preserve the current Administration page structure and entry points while modernizing the visual system with Vector components.

## Preserved Layout Pattern

- Global top navigation remains a horizontal product-level nav.
- Left rail remains the primary module navigation.
- Environment context remains above the dashboard content.
- The center content remains an `Admin Quick Access` panel.
- The same six primary shortcuts remain the focal actions:
  - Manage Your Personnel
  - Import Training Materials
  - Quizzes, Tasklists, Classes
  - Assign Training
  - Manage Completion Records
  - View Reports

## Vector Components Used

- `vwc-topnav` for the global shell and logo.
- `vwc-sidenav` for the Administration navigation rail.
- `vwc-bread-crumb-nav` for environment and page context.
- `vwc-card` for the quick-access panel container.
- `vwc-badge` for the environment label.
- `vwc-drawer` for lightweight tile detail.
- `vaadin-button` and `vaadin-notification` for small supporting interactions.

## Refresh Principles

- Modern spacing and cleaner alignment.
- Better contrast and clearer type hierarchy.
- More intentional tile sizing and icon treatment.
- Responsive behavior without changing the core admin information architecture.
