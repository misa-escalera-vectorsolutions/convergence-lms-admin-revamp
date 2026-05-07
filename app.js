(function bootstrapAdministrationRevamp() {
const { fetchAdministrationPrototype } = window.ConvergenceAdminData;

const elements = {
  appShell: document.getElementById('appShell'),
  topnav: document.getElementById('topnav'),
  quickActionGrid: document.getElementById('quickActionGrid'),
  instanceBadge: document.getElementById('instanceBadge'),
  instanceMeta: document.getElementById('instanceMeta'),
  locationChip: document.getElementById('locationChip'),
  locationPickerOverlay: document.getElementById('locationPickerOverlay'),
  locationPickerPanel: document.getElementById('locationPickerPanel'),
  locationPickerTree: document.getElementById('locationPickerTree'),
  breadcrumbTrail: document.getElementById('breadcrumbTrail'),
  topnavUserMenu: document.getElementById('topnavUserMenu'),
  topnavNotificationsMenu: document.getElementById('topnavNotificationsMenu'),
  languageSelectorDialog: document.getElementById('languageSelectorDialog'),
  sidebarSearchControl: document.querySelector('.sidebar-search-control'),
  sidebarSearchInput: document.getElementById('sidebarSearchInput'),
  sidebarToggle: document.getElementById('sidebarToggle'),
  sidebarNavList: document.getElementById('sidebarNavList'),
  actionDrawer: document.getElementById('actionDrawer'),
  drawerTitle: document.getElementById('drawerTitle'),
  drawerMeta: document.getElementById('drawerMeta'),
  drawerDescription: document.getElementById('drawerDescription'),
  drawerParity: document.getElementById('drawerParity'),
  drawerComponents: document.getElementById('drawerComponents'),
  drawerPrimaryAction: document.getElementById('drawerPrimaryAction'),
  drawerSecondaryAction: document.getElementById('drawerSecondaryAction'),
  notification: document.getElementById('notification')
};

let currentAction = null;
const state = {
  baseData: null,
  activeAccountId: 'vector',
  sessionSwitching: false,
  sidebarCollapsed: false,
  sidebarQuery: '',
  sidebarOpenGroupIds: new Set(),
  sidenavItems: [],
  locationTree: [],
  pageLabel: 'Administration Dashboard',
  locationPickerOpen: false,
  locationExpandedIds: new Set(),
  selectedLocation: {
    organizationId: '',
    regionId: '',
    siteId: '',
    departmentId: '',
    teamId: ''
  }
};

const locationLevels = [
  { key: 'organizationId', label: 'Organization', childKey: 'regions' },
  { key: 'regionId', label: 'Region', childKey: 'sites' },
  { key: 'siteId', label: 'Site', childKey: 'departments' },
  { key: 'departmentId', label: 'Department', childKey: 'teams' },
  { key: 'teamId', label: 'Team', childKey: null }
];

const vectorNotifications = [
  {
    id: 'notif-1',
    title: 'New completion exceptions',
    description: '4 learner records need review in Tracking and Completions.',
    category: 'Administration',
    read: false,
    timestamp: '5 min ago'
  },
  {
    id: 'notif-2',
    title: 'Import finished',
    description: 'The April safety training package import completed successfully.',
    category: 'Training Import',
    read: false,
    timestamp: '18 min ago'
  },
  {
    id: 'notif-3',
    title: 'Quarterly report ready',
    description: 'Compliance summary is available in Reports.',
    category: 'Reports',
    read: true,
    timestamp: '1 hr ago'
  }
];

const starbucksLocationTree = [
  {
    id: 'starbucks-coffee-company',
    text: 'Starbucks Coffee Company',
    regions: [
      {
        id: 'northwest-region',
        text: 'Northwest Region',
        sites: [
          {
            id: 'seattle-reserve-roastery',
            text: 'Seattle Reserve Roastery',
            departments: [
              {
                id: 'store-operations',
                text: 'Store Operations',
                teams: [
                  { id: 'shift-supervisors', text: 'Shift Supervisors' },
                  { id: 'barista-trainers', text: 'Barista Trainers' }
                ]
              },
              {
                id: 'learning-compliance',
                text: 'Learning And Compliance',
                teams: [
                  { id: 'regional-compliance', text: 'Regional Compliance' },
                  { id: 'coffee-mastery', text: 'Coffee Mastery' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

const starbucksNotifications = [
  {
    id: 'sbux-notif-1',
    title: 'Store audit completions ready',
    description: 'Seattle Reserve Roastery audit results are ready for review.',
    category: 'Tracking',
    read: false,
    timestamp: '7 min ago'
  },
  {
    id: 'sbux-notif-2',
    title: 'Partner training import finished',
    description: 'Spring beverage rollout materials imported successfully.',
    category: 'Training Import',
    read: false,
    timestamp: '19 min ago'
  },
  {
    id: 'sbux-notif-3',
    title: 'Regional compliance report published',
    description: 'Northwest Region report is available in Reports.',
    category: 'Reports',
    read: true,
    timestamp: '52 min ago'
  }
];

function getAccountConfig(accountId) {
  if (accountId === 'starbucks') {
    return {
      id: 'starbucks',
      brand: 'starbucks',
      logo: {
        src: 'assets/Starbucks client logo.svg.png',
        alt: 'Starbucks'
      },
      user: {
        firstName: 'Jordan',
        lastName: 'Reed',
        email: 'jordan.reed@starbucks.com'
      },
      environmentLabel: 'Starbucks UAT',
      instanceMeta: 'Version 2.57.0.0 · Instance STARBUCKS-UAT-01',
      locationTree: starbucksLocationTree,
      defaultLocation: {
        organizationId: 'starbucks-coffee-company',
        regionId: 'northwest-region',
        siteId: 'seattle-reserve-roastery',
        departmentId: 'store-operations',
        teamId: 'shift-supervisors'
      },
      notifications: starbucksNotifications
    };
  }

  return {
    id: 'vector',
    brand: 'vector',
    logo: {
      src: '../../Presentations/assets/Vector Solutions logo.svg',
      alt: 'Vector Solutions'
    },
    user: {
      firstName: 'Mia',
      lastName: 'Carter',
      email: 'mia.carter@vectorsolutions.com'
    },
    environmentLabel: state.baseData.environmentLabel,
    instanceMeta: state.baseData.instanceMeta,
    locationTree: state.baseData.locationTree,
    defaultLocation: state.baseData.defaultLocation,
    notifications: vectorNotifications
  };
}

function getSelectedNodes() {
  const organization = state.locationTree.find((item) => item.id === state.selectedLocation.organizationId) || null;
  const region = organization?.regions.find((item) => item.id === state.selectedLocation.regionId) || null;
  const site = region?.sites.find((item) => item.id === state.selectedLocation.siteId) || null;
  const department = site?.departments.find((item) => item.id === state.selectedLocation.departmentId) || null;
  const team = department?.teams.find((item) => item.id === state.selectedLocation.teamId) || null;
  return { organization, region, site, department, team };
}

function renderBreadcrumb() {
  const { organization, region, site, department, team } = getSelectedNodes();
  const segments = [
    organization ? { text: organization.text, key: 'organizationId', id: organization.id } : null,
    region ? { text: region.text, key: 'regionId', id: region.id } : null,
    site ? { text: site.text, key: 'siteId', id: site.id } : null,
    department ? { text: department.text, key: 'departmentId', id: department.id } : null,
    team ? { text: team.text, key: 'teamId', id: team.id } : null,
    { text: state.pageLabel, key: '', id: '' }
  ].filter(Boolean);

  elements.breadcrumbTrail.innerHTML = segments.map((segment, index) => {
    const isCurrent = index === segments.length - 1;
    if (isCurrent) {
      return `<span class="breadcrumb-current" data-breadcrumb-key="current-page">${segment.text}</span>`;
    }

    return `
      <button
        type="button"
        class="breadcrumb-segment breadcrumb-button"
        data-breadcrumb-key="${segment.key}:${segment.id}"
        data-breadcrumb-level="${segment.key}"
        data-breadcrumb-id="${segment.id}">
        ${segment.text}
      </button>
      <i
        class="fa-solid fa-chevron-right context-chevron"
        data-breadcrumb-chevron-index="${index}"
        aria-hidden="true"></i>
    `;
  }).join('');
}

function captureBreadcrumbLayout(targetIndex) {
  const layout = new Map();
  const buttons = [...elements.breadcrumbTrail.querySelectorAll('.breadcrumb-button')];
  const chevrons = [...elements.breadcrumbTrail.querySelectorAll('.context-chevron')];
  const current = elements.breadcrumbTrail.querySelector('.breadcrumb-current');

  buttons.forEach((button, index) => {
    if (targetIndex == null || index <= targetIndex) {
      layout.set(button.dataset.breadcrumbKey, button.getBoundingClientRect());
    }
  });

  chevrons.forEach((chevron, index) => {
    if (targetIndex == null || index <= targetIndex) {
      layout.set(`chevron:${index}`, chevron.getBoundingClientRect());
    }
  });

  if (current) {
    layout.set('current-page', current.getBoundingClientRect());
  }

  return layout;
}

function animateBreadcrumbLayout(previousLayout) {
  requestAnimationFrame(() => {
    const nextElements = [
      ...elements.breadcrumbTrail.querySelectorAll('[data-breadcrumb-key]'),
      ...elements.breadcrumbTrail.querySelectorAll('[data-breadcrumb-chevron-index]')
    ];

    nextElements.forEach((element) => {
      const key = element.dataset.breadcrumbKey
        || `chevron:${element.dataset.breadcrumbChevronIndex}`;
      const previousRect = previousLayout.get(key);
      if (!previousRect) {
        return;
      }

      const nextRect = element.getBoundingClientRect();
      const deltaX = previousRect.left - nextRect.left;
      const deltaY = previousRect.top - nextRect.top;

      if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
        return;
      }

      element.animate(
        [
          {
            transform: `translate(${deltaX}px, ${deltaY}px)`,
            opacity: 0.78
          },
          {
            transform: 'translate(0, 0)',
            opacity: 1
          }
        ],
        {
          duration: 560,
          easing: 'cubic-bezier(0.2, 0.9, 0.22, 1)',
          fill: 'both'
        }
      );
    });
  });
}

function applyLocationSelection(level, value) {
  const resolvedPath = getLocationPathById(value);
  if (!resolvedPath) {
    return false;
  }

  state.selectedLocation.organizationId = resolvedPath.organizationId || '';
  state.selectedLocation.regionId = resolvedPath.regionId || '';
  state.selectedLocation.siteId = resolvedPath.siteId || '';
  state.selectedLocation.departmentId = resolvedPath.departmentId || '';
  state.selectedLocation.teamId = resolvedPath.teamId || '';

  if (level === 'organizationId') {
    state.selectedLocation.regionId = '';
    state.selectedLocation.siteId = '';
    state.selectedLocation.departmentId = '';
    state.selectedLocation.teamId = '';
  } else if (level === 'regionId') {
    state.selectedLocation.siteId = '';
    state.selectedLocation.departmentId = '';
    state.selectedLocation.teamId = '';
  } else if (level === 'siteId') {
    state.selectedLocation.departmentId = '';
    state.selectedLocation.teamId = '';
  } else if (level === 'departmentId') {
    state.selectedLocation.teamId = '';
  }

  renderLocationPicker();
  renderBreadcrumb();
  syncExpandedPathToSelection();
  return true;
}

function animateBreadcrumbNavigation(button) {
  const buttons = [...elements.breadcrumbTrail.querySelectorAll('.breadcrumb-button')];
  const chevrons = [...elements.breadcrumbTrail.querySelectorAll('.context-chevron')];
  const targetIndex = buttons.indexOf(button);
  const previousLayout = captureBreadcrumbLayout(targetIndex);

  if (targetIndex < 0) {
    return;
  }

  buttons.forEach((segmentButton, index) => {
    if (index > targetIndex) {
      segmentButton.classList.add('breadcrumb-fading-out');
    }
  });

  chevrons.forEach((chevron, index) => {
    if (index > targetIndex) {
      chevron.classList.add('breadcrumb-fading-out');
    }
  });

  window.setTimeout(() => {
    if (applyLocationSelection(button.dataset.breadcrumbLevel, button.dataset.breadcrumbId)) {
      animateBreadcrumbLayout(previousLayout);
    }
  }, 220);
}

function getActiveLocationSelection() {
  const levelsInReverse = [...locationLevels].reverse();
  for (const level of levelsInReverse) {
    const value = state.selectedLocation[level.key];
    if (value) {
      return { key: level.key, id: value };
    }
  }
  return { key: '', id: '' };
}

function getLocationPathById(itemId) {
  for (const organization of state.locationTree) {
    if (organization.id === itemId) {
      return { organizationId: organization.id };
    }

    for (const region of organization.regions || []) {
      if (region.id === itemId) {
        return {
          organizationId: organization.id,
          regionId: region.id
        };
      }

      for (const site of region.sites || []) {
        if (site.id === itemId) {
          return {
            organizationId: organization.id,
            regionId: region.id,
            siteId: site.id
          };
        }

        for (const department of site.departments || []) {
          if (department.id === itemId) {
            return {
              organizationId: organization.id,
              regionId: region.id,
              siteId: site.id,
              departmentId: department.id
            };
          }

          for (const team of department.teams || []) {
            if (team.id === itemId) {
              return {
                organizationId: organization.id,
                regionId: region.id,
                siteId: site.id,
                departmentId: department.id,
                teamId: team.id
              };
            }
          }
        }
      }
    }
  }

  return null;
}

function syncExpandedPathToSelection() {
  const expanded = [];
  const organization = state.locationTree.find((item) => item.id === state.selectedLocation.organizationId) || null;
  if (!organization) {
    state.locationExpandedIds = new Set();
    return;
  }

  expanded.push(organization.id);

  const region = organization.regions?.find((item) => item.id === state.selectedLocation.regionId) || null;
  if (!region) {
    state.locationExpandedIds = new Set(expanded);
    return;
  }

  expanded.push(region.id);

  const site = region.sites?.find((item) => item.id === state.selectedLocation.siteId) || null;
  if (!site) {
    state.locationExpandedIds = new Set(expanded);
    return;
  }

  expanded.push(site.id);

  const department = site.departments?.find((item) => item.id === state.selectedLocation.departmentId) || null;
  if (!department) {
    state.locationExpandedIds = new Set(expanded);
    return;
  }

  expanded.push(department.id);
  state.locationExpandedIds = new Set(expanded);
}

function findLocationItemById(items, itemId) {
  for (const item of items) {
    if (item.id === itemId) {
      return item;
    }

    const childCollections = ['regions', 'sites', 'departments', 'teams']
      .map((key) => item[key])
      .filter(Boolean);

    for (const collection of childCollections) {
      const match = findLocationItemById(collection, itemId);
      if (match) {
        return match;
      }
    }
  }

  return null;
}

function setLocationPickerOpen(isOpen) {
  state.locationPickerOpen = isOpen;
  elements.appShell.classList.toggle('location-picker-open', isOpen);
  elements.locationPickerPanel.classList.toggle('is-open', isOpen);
  elements.locationChip.setAttribute('aria-expanded', String(isOpen));
}

function syncTopnavOverlayState() {
  const overlayOpen = [...document.querySelectorAll('vaadin-popover-overlay')]
    .some((overlay) => !overlay.hidden);
  if (overlayOpen && state.locationPickerOpen) {
    setLocationPickerOpen(false);
  }
  elements.appShell.classList.toggle('topnav-overlay-open', overlayOpen);
}

function buildLocationLevel(items, levelIndex) {
  const level = locationLevels[levelIndex];
  const activeSelection = getActiveLocationSelection();
  return items.map((item, index) => {
    const isActive = activeSelection.key === level.key && activeSelection.id === item.id;
    const childItems = level.childKey ? (item[level.childKey] || []) : [];
    const hasChildren = childItems.length > 0 && levelIndex < locationLevels.length - 1;
    const isExpanded = state.locationExpandedIds.has(item.id);
    const content = `
      <div class="location-node-row ${isActive ? 'selected' : ''}" style="--location-depth:${levelIndex};">
        ${hasChildren ? `
          <button
            type="button"
            class="location-toggle-button"
            data-location-toggle="${item.id}"
            aria-expanded="${isExpanded}"
            aria-label="${isExpanded ? `Collapse ${item.text}` : `Expand ${item.text}`}">
            <i class="fa-solid ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} location-option-chevron" aria-hidden="true"></i>
          </button>
        ` : '<span class="location-toggle-spacer" aria-hidden="true"></span>'}
        <button
          type="button"
          class="location-option-summary ${isActive ? 'selected' : ''}"
          data-location-level="${level.key}"
          data-location-id="${item.id}"
          aria-pressed="${isActive}">
          <span class="location-option-copy">
            <strong>${item.text}</strong>
            <span>${level.label}</span>
          </span>
        </button>
        <i class="fa-solid fa-check location-option-check${isActive ? '' : ' is-hidden'}" aria-hidden="true"></i>
      </div>
    `;

    if (!hasChildren) {
      return `<div class="location-option-leaf">${content}</div>`;
    }

    return `
      <div class="location-node ${isExpanded ? 'expanded' : ''}">
        ${content}
        <div class="location-children" ${isExpanded ? '' : 'hidden'}>
          ${isExpanded ? buildLocationLevel(childItems, levelIndex + 1) : ''}
        </div>
      </div>
    `;
  }).join('');
}

function toggleLocationBranch(itemId) {
  if (state.locationExpandedIds.has(itemId)) {
    state.locationExpandedIds.delete(itemId);
  } else {
    state.locationExpandedIds.add(itemId);
  }
}

function handleLocationToggle(button) {
  const itemId = button.dataset.locationToggle;
  const node = button.closest('.location-node');
  const children = node?.querySelector(':scope > .location-children');
  const icon = button.querySelector('.location-option-chevron');
  const item = findLocationItemById(state.locationTree, itemId);
  const labelBase = button.getAttribute('aria-label')?.replace(/^Collapse /, '').replace(/^Expand /, '') || itemId;
  const isExpanded = state.locationExpandedIds.has(itemId);
  const levelIndex = locationLevels.findIndex((level) => level.childKey && Array.isArray(item?.[level.childKey]));
  const childItems = levelIndex >= 0 ? item?.[locationLevels[levelIndex].childKey] || [] : [];

  if (!node || !children || !icon) {
    return;
  }

  if (isExpanded) {
    toggleLocationBranch(itemId);
    node.classList.remove('expanded', 'animating-open');
    node.classList.add('closing');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', `Expand ${labelBase}`);
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-right');

    const onTransitionEnd = (event) => {
      if (event.propertyName !== 'grid-template-rows') {
        return;
      }
      children.hidden = true;
      node.classList.remove('closing');
      node.removeEventListener('transitionend', onTransitionEnd);
    };

    node.addEventListener('transitionend', onTransitionEnd);
    return;
  }

  toggleLocationBranch(itemId);
  if (!children.innerHTML.trim() && childItems.length > 0 && levelIndex >= 0) {
    children.innerHTML = buildLocationLevel(childItems, levelIndex + 1);
    children.querySelectorAll('[data-location-toggle]').forEach((childButton) => {
      childButton.addEventListener('click', (event) => {
        event.stopPropagation();
        handleLocationToggle(childButton);
      });
    });

    children.querySelectorAll('[data-location-level]').forEach((childButton) => {
      childButton.addEventListener('click', () => {
        updateLocationSelection(childButton.dataset.locationLevel, childButton.dataset.locationId, childButton);
      });
    });
  }
  children.hidden = false;
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-label', `Collapse ${labelBase}`);
  icon.classList.remove('fa-chevron-right');
  icon.classList.add('fa-chevron-down');

  requestAnimationFrame(() => {
    node.classList.remove('closing');
    node.classList.add('expanded', 'animating-open');
    window.setTimeout(() => {
      node.classList.remove('animating-open');
    }, 420);
  });
}

function renderLocationPicker() {
  elements.locationPickerTree.innerHTML = buildLocationLevel(state.locationTree, 0);

  elements.locationPickerTree.querySelectorAll('[data-location-toggle]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      handleLocationToggle(button);
    });
  });

  elements.locationPickerTree.querySelectorAll('[data-location-level]').forEach((button) => {
    button.addEventListener('click', () => {
      updateLocationSelection(button.dataset.locationLevel, button.dataset.locationId, button);
    });
  });
}

function updateLocationSelection(level, value, sourceButton = null) {
  const sourceRow = sourceButton?.closest('.location-node-row');
  const previousSelectedRow = elements.locationPickerTree.querySelector('.location-node-row.selected');
  const sourceCheck = sourceRow?.querySelector('.location-option-check');

  if (previousSelectedRow && previousSelectedRow !== sourceRow) {
    previousSelectedRow.classList.add('deselecting');
  }

  if (sourceRow) {
    sourceRow.classList.add('selecting');
    sourceCheck?.classList.remove('is-hidden');
  }

  const resolvedPath = getLocationPathById(value);
  if (!resolvedPath) {
    if (sourceRow) {
      sourceRow.classList.remove('selecting');
    }
    return;
  }

  window.setTimeout(() => {
    applyLocationSelection(level, value);
    setLocationPickerOpen(false);
  }, 600);
}

function initializeLocation(data) {
  state.locationTree = data.locationTree;
  state.selectedLocation = { ...data.defaultLocation };
  syncExpandedPathToSelection();
  renderLocationPicker();
  renderBreadcrumb();
}

function applyAccountSession(config) {
  state.activeAccountId = config.id;
  elements.appShell.dataset.brand = config.brand;
  elements.topnav.logo = config.logo;
  elements.topnavUserMenu.user = config.user;
  elements.instanceBadge.textContent = config.environmentLabel;
  elements.instanceMeta.textContent = config.instanceMeta;
  elements.topnavNotificationsMenu.notifications = config.notifications;
  initializeLocation({
    locationTree: config.locationTree,
    defaultLocation: config.defaultLocation
  });
}

function closeTopnavPopovers() {
  [elements.topnavUserMenu, elements.topnavNotificationsMenu].forEach((element) => {
    if ('opened' in element) {
      element.opened = false;
    }
    if ('open' in element) {
      element.open = false;
    }
  });

  document.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'Escape',
    bubbles: true
  }));

  window.setTimeout(syncTopnavOverlayState, 0);
}

async function switchMockSession() {
  if (state.sessionSwitching) {
    return;
  }

  state.sessionSwitching = true;
  const nextAccountId = state.activeAccountId === 'vector' ? 'starbucks' : 'vector';

  closeTopnavPopovers();
  setLocationPickerOpen(false);
  elements.actionDrawer.open = false;
  elements.appShell.classList.add('session-switching');
  elements.appShell.setAttribute('aria-busy', 'true');

  await new Promise((resolve) => {
    window.setTimeout(resolve, 1000);
  });

  applyAccountSession(getAccountConfig(nextAccountId));
  elements.appShell.classList.remove('session-switching');
  elements.appShell.removeAttribute('aria-busy');
  state.sessionSwitching = false;

  setNotification(
    nextAccountId === 'starbucks'
      ? 'Switched to Starbucks client session'
      : 'Switched to Vector Solutions session',
    'contrast'
  );
}

function setNotification(message, theme = 'primary') {
  elements.notification.renderer = (root) => {
    root.textContent = message;
  };
  elements.notification.theme = theme;
  elements.notification.opened = true;
}

function renderShell(data) {
  elements.topnav.helpToggle = true;
  elements.topnav.helpAccessibleName = 'Open administration help';
  elements.topnavUserMenu.menuItems = [];
  elements.topnavUserMenu.i18n = {
    language_selector_label: 'Language',
    logout_label: 'Sign Out',
    user_menu_toggle_label: 'Open profile menu',
    user_menu_label: 'Profile menu'
  };
  elements.languageSelectorDialog.languages = [
    { id: 'en', text: 'English' },
    { id: 'es', text: 'Spanish' },
    { id: 'fr', text: 'French' }
  ];
  elements.languageSelectorDialog.selectedLanguageId = 'en';
  elements.topnavNotificationsMenu.showUnreadNotificationsCount = false;
  elements.topnavNotificationsMenu.i18n = {
    unread_notifications_count: 'You have unread notifications'
  };
  state.sidenavItems = data.sidenavItems;
  renderSidebar(data.sidenavItems);
  applyAccountSession(getAccountConfig(state.activeAccountId));
}

function renderSidebar(items) {
  const query = state.sidebarQuery.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    if (!query) {
      return true;
    }

    if (item.text.toLowerCase().includes(query)) {
      return true;
    }

    return item.children?.some((child) => child.text.toLowerCase().includes(query));
  }).map((item) => {
    if (!query || item.type === 'link') {
      return item;
    }

    const matchedChildren = item.children.filter((child) => child.text.toLowerCase().includes(query));
    return {
      ...item,
      children: matchedChildren.length > 0 ? matchedChildren : item.children
    };
  });

  elements.sidebarNavList.innerHTML = filteredItems.map((item) => {
    if (item.type === 'link') {
      return `
        <div class="sidebar-item">
          <a
            class="sidebar-link ${item.current ? 'active' : ''}"
            href="${item.href}"
            ${item.current ? 'aria-current="page"' : ''}
            title="${item.text}">
            <i class="fa-solid ${item.icon} sidebar-icon" aria-hidden="true"></i>
            <span class="sidebar-label">${item.text}</span>
            <span class="trailing" aria-hidden="true"></span>
          </a>
        </div>
      `;
    }

    const isOpen = query ? true : state.sidebarOpenGroupIds.has(item.id);

    return `
      <div class="sidebar-group ${isOpen ? 'open' : ''}" data-group-id="${item.id}">
        <button
          type="button"
          class="sidebar-group-toggle"
          aria-expanded="${isOpen}"
          aria-controls="group-${item.id}"
          title="${item.text}">
          <i class="fa-solid ${item.icon} sidebar-icon" aria-hidden="true"></i>
          <span class="sidebar-label">${item.text}</span>
          <i class="fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} trailing" aria-hidden="true"></i>
        </button>
        <div id="group-${item.id}" class="sidebar-children">
          ${item.children.map((child) => `<a class="sidebar-child-link" href="${child.href}">${child.text}</a>`).join('')}
        </div>
      </div>
    `;
  }).join('');

  if (query) {
    elements.sidebarNavList.querySelectorAll('.sidebar-group').forEach((group) => {
      group.classList.add('open');
    });
  }

  elements.sidebarNavList.querySelectorAll('.sidebar-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!state.sidebarCollapsed) {
        return;
      }

      event.preventDefault();
      expandSidebar();
    });
  });

  elements.sidebarNavList.querySelectorAll('.sidebar-group-toggle').forEach((button) => {
    button.addEventListener('click', (event) => {
      const group = button.closest('.sidebar-group');
      const groupId = group?.dataset.groupId;

      if (!groupId) {
        return;
      }

      if (state.sidebarCollapsed) {
        event.preventDefault();
        expandSidebar(groupId);
        return;
      }

      const isOpen = state.sidebarOpenGroupIds.has(groupId);
      const openGroups = [...elements.sidebarNavList.querySelectorAll('.sidebar-group.open')];

      openGroups.forEach((openGroup) => {
        const openGroupId = openGroup.dataset.groupId;
        if (!openGroupId || openGroupId === groupId) {
          return;
        }

        openGroup.classList.remove('open');
        state.sidebarOpenGroupIds.delete(openGroupId);
        const openButton = openGroup.querySelector('.sidebar-group-toggle');
        openButton?.setAttribute('aria-expanded', 'false');
        const openIcon = openButton?.querySelector('.trailing');
        if (openIcon) {
          openIcon.classList.remove('fa-chevron-up');
          openIcon.classList.add('fa-chevron-down');
        }
      });

      if (isOpen) {
        group.classList.remove('open');
        state.sidebarOpenGroupIds.delete(groupId);
      } else {
        group.classList.add('open');
        state.sidebarOpenGroupIds.clear();
        state.sidebarOpenGroupIds.add(groupId);
      }

      button.setAttribute('aria-expanded', String(!isOpen));
      const icon = button.querySelector('.trailing');
      if (icon) {
        icon.classList.toggle('fa-chevron-down', isOpen);
        icon.classList.toggle('fa-chevron-up', !isOpen);
      }
    });
  });
}

function renderQuickActions(actions) {
  elements.quickActionGrid.innerHTML = actions.map((action) => `
    <button
      type="button"
      class="quick-tile"
      data-action-id="${action.id}"
      aria-label="${action.title}. ${action.subtitle}">
      <div class="quick-tile-icon">
        <i class="fa-solid ${action.icon}" aria-hidden="true"></i>
      </div>
      <div>
        <strong>${action.title}</strong>
        <span>${action.subtitle}</span>
      </div>
    </button>
  `).join('');

  elements.quickActionGrid.querySelectorAll('[data-action-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = actions.find((item) => item.id === button.dataset.actionId);
      openActionDetail(action);
    });
  });
}

function openActionDetail(action) {
  currentAction = action;
  elements.drawerTitle.textContent = action.title;
  elements.drawerMeta.textContent = `Legacy area: ${action.legacyArea}`;
  elements.drawerDescription.textContent = action.subtitle;
  elements.drawerParity.innerHTML = action.parity.map((item) => `<div>• ${item}</div>`).join('');
  elements.drawerComponents.innerHTML = action.vectorComponents.map((item) => `<div>• ${item}</div>`).join('');
  elements.actionDrawer.open = true;
}

function toggleSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  elements.appShell.classList.toggle('sidebar-collapsed', state.sidebarCollapsed);
  elements.sidebarToggle.setAttribute('aria-expanded', String(!state.sidebarCollapsed));
  elements.sidebarToggle.setAttribute('aria-label', state.sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation');
  if (state.sidebarCollapsed) {
    elements.sidebarSearchInput.blur();
  } else {
    window.setTimeout(() => {
      elements.sidebarSearchInput.focus();
    }, 140);
  }
  const icon = elements.sidebarToggle.querySelector('i');
  if (icon) {
    icon.classList.toggle('fa-chevron-left', !state.sidebarCollapsed);
    icon.classList.toggle('fa-chevron-right', state.sidebarCollapsed);
  }
}

function expandSidebar(groupIdToOpen = null) {
  if (groupIdToOpen) {
    state.sidebarOpenGroupIds.clear();
    state.sidebarOpenGroupIds.add(groupIdToOpen);
  }

  if (!state.sidebarCollapsed) {
    renderSidebar(state.sidenavItems);
    return;
  }

  toggleSidebar();
  renderSidebar(state.sidenavItems);
}

function expandSidebarAndFocusSearch() {
  if (!state.sidebarCollapsed) {
    elements.sidebarSearchInput.focus();
    elements.sidebarSearchInput.select();
    return;
  }

  expandSidebar();
  window.setTimeout(() => {
    elements.sidebarSearchInput.focus();
    elements.sidebarSearchInput.select();
  }, 140);
}

function bindEvents() {
  elements.languageSelectorDialog.addEventListener('language-change', (event) => {
    const language = event.detail;
    elements.languageSelectorDialog.selectedLanguageId = language;
    if (language) {
      setNotification(`Language changed to ${language.toUpperCase()}`, 'contrast');
    }
  });

  elements.topnavUserMenu.addEventListener('profile-click', () => {
    setNotification('Profile opened', 'contrast');
  });

  elements.topnavUserMenu.addEventListener('logout-click', () => {
    switchMockSession();
  });

  elements.topnavNotificationsMenu.addEventListener('notification-click', () => {
    setNotification('Notification opened', 'contrast');
  });

  elements.topnavNotificationsMenu.addEventListener('clear-all', () => {
    setNotification('Notifications cleared', 'contrast');
  });

  elements.topnav.addEventListener('help-click', () => {
    setNotification('Help opened for the Administration dashboard', 'contrast');
  });

  elements.locationChip.addEventListener('click', () => {
    if (!state.locationPickerOpen) {
      syncExpandedPathToSelection();
      renderLocationPicker();
    }
    setLocationPickerOpen(!state.locationPickerOpen);
  });

  elements.locationPickerOverlay.addEventListener('click', () => {
    setLocationPickerOpen(false);
  });

  elements.breadcrumbTrail.addEventListener('click', (event) => {
    const button = event.target.closest('[data-breadcrumb-level]');
    if (!button) {
      return;
    }

    animateBreadcrumbNavigation(button);
  });

  elements.sidebarSearchInput.addEventListener('input', (event) => {
    state.sidebarQuery = event.target.value;
    renderSidebar(state.sidenavItems);
  });

  elements.sidebarSearchControl.addEventListener('click', (event) => {
    if (!state.sidebarCollapsed) {
      return;
    }

    event.preventDefault();
    expandSidebarAndFocusSearch();
  });

  elements.sidebarToggle.addEventListener('click', toggleSidebar);

  elements.drawerPrimaryAction.addEventListener('click', () => {
    if (currentAction) {
      setNotification(`Opened ${currentAction.title.toLowerCase()}`, 'success');
    }
  });

  elements.drawerSecondaryAction.addEventListener('click', () => {
    elements.actionDrawer.open = false;
  });

  document.addEventListener('click', (event) => {
    if (!state.locationPickerOpen) {
      return;
    }

    const eventPath = event.composedPath();
    const clickedInsidePicker = eventPath.includes(elements.locationPickerPanel);
    const clickedTrigger = eventPath.includes(elements.locationChip);
    const clickedOverlay = eventPath.includes(elements.locationPickerOverlay);
    if (clickedOverlay) {
      setLocationPickerOpen(false);
      return;
    }
    if (!clickedInsidePicker && !clickedTrigger) {
      setLocationPickerOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.locationPickerOpen) {
      setLocationPickerOpen(false);
      elements.locationChip.focus();
    }
  });

  const overlayObserver = new MutationObserver(() => {
    syncTopnavOverlayState();
  });

  overlayObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['hidden', 'opened', 'open']
  });

  window.setTimeout(syncTopnavOverlayState, 0);
}

async function init() {
  const data = await fetchAdministrationPrototype();
  state.baseData = data;
  renderShell(data);
  renderQuickActions(data.quickActions);
  bindEvents();
}

init();
})();
