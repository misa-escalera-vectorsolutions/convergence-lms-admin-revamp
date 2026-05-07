const quickActions = [
  {
    id: 'personnel',
    title: 'Manage Your Personnel',
    subtitle: 'Assignments, roles, and learner records for supervisors and employees.',
    icon: 'fa-users',
    legacyArea: 'Organization > Personnel',
    parity: [
      'Same starting point for managing learner rosters and administrative updates.',
      'Same Administration landing-page behavior as a jump-off into the personnel workflow.'
    ],
    vectorComponents: [
      'Rendered as a modern quick-access tile inside a vwc-card dashboard shell.',
      'Uses Vector theme tokens for spacing, color, elevation, and responsive behavior.'
    ]
  },
  {
    id: 'imports',
    title: 'Import Training Materials',
    subtitle: 'SCORM packages, metadata, and catalog creation workflows.',
    icon: 'fa-file-arrow-down',
    legacyArea: 'Training Import and Creation',
    parity: [
      'Preserves the import-and-create path visible in the current Administration dashboard.',
      'Keeps content administration as a primary action rather than burying it in a new layout.'
    ],
    vectorComponents: [
      'Tile visuals are refreshed while keeping the same functional prominence as the legacy blue tile.',
      'Uses Vector card styling and navigation shell instead of bespoke legacy panel chrome.'
    ]
  },
  {
    id: 'quizzes',
    title: 'Quizzes, Tasklists, Classes',
    subtitle: 'Activity setup for assessments, classes, and recurring operational learning.',
    icon: 'fa-calendar-days',
    legacyArea: 'Activities',
    parity: [
      'Matches the legacy combined action for quizzes, tasklists, and classes.',
      'Keeps the grouping intact rather than splitting it into new workflow areas.'
    ],
    vectorComponents: [
      'Presented as a clearer, more legible tile with refreshed typography and spacing.',
      'Lives within the same admin quick-access grid pattern.'
    ]
  },
  {
    id: 'assignments',
    title: 'Assign Training',
    subtitle: 'Launch curriculum, targeted enrollment, and role-based training assignments.',
    icon: 'fa-book-open-reader',
    legacyArea: 'Assignments',
    parity: [
      'Maintains assignment creation as a first-tier action from the Administration page.',
      'Supports the same admin mental model: choose area first, then drill into the task.'
    ],
    vectorComponents: [
      'Refreshed tile state and spacing use Vector design tokens instead of legacy panel styling.',
      'Sits inside the same quick-access region to preserve scan order.'
    ]
  },
  {
    id: 'records',
    title: 'Manage Completion Records',
    subtitle: 'Correct records, review exceptions, and reconcile completions.',
    icon: 'fa-scroll',
    legacyArea: 'Tracking and Completions',
    parity: [
      'Preserves completion-record management as a top-level Administration task.',
      'Still behaves like an admin shortcut, not a new dashboard workflow.'
    ],
    vectorComponents: [
      'Updated presentation uses Vector card patterns and more accessible contrast.',
      'Keeps the same relative position in the second row of quick-access actions.'
    ]
  },
  {
    id: 'reports',
    title: 'View Reports',
    subtitle: 'Run report views for compliance, assignments, and completion tracking.',
    icon: 'fa-map',
    legacyArea: 'Reports',
    parity: [
      'Retains reporting as a direct quick-access destination from Administration.',
      'Avoids introducing a new reporting dashboard or alternate information architecture.'
    ],
    vectorComponents: [
      'Visual refresh comes from Vector spacing, type scale, and elevation.',
      'Stays functionally equivalent to the legacy report launcher tile.'
    ]
  }
];

const sidenavItems = [
  { type: 'link', id: 'dashboard', text: 'Dashboard', href: '#', icon: 'fa-gauge-high', current: true },
  {
    type: 'group',
    id: 'organization',
    text: 'Organization',
    icon: 'fa-building',
    children: [
      { id: 'organization-users', text: 'Users', href: '#' },
      { id: 'organization-teams', text: 'Teams', href: '#' },
      { id: 'organization-departments', text: 'Departments', href: '#' },
      { id: 'organization-sites', text: 'Sites', href: '#' },
      { id: 'organization-regions', text: 'Regions', href: '#' },
      { id: 'organization-groups', text: 'Groups', href: '#' },
      { id: 'organization-places', text: 'Places', href: '#' },
      { id: 'organization-contacts', text: 'Contacts', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'training',
    text: 'Training Import And Creation',
    icon: 'fa-file-import',
    children: [
      { id: 'training-content-wizard', text: 'Content Wizard', href: '#' },
      { id: 'training-quizzes', text: 'Quizzes', href: '#' },
      { id: 'training-surveys', text: 'Surveys', href: '#' },
      { id: 'training-tasklists', text: 'Tasklists', href: '#' },
      { id: 'training-signatures', text: 'Signatures', href: '#' },
      { id: 'training-classes', text: 'Classes', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'files',
    text: 'Files',
    icon: 'fa-file-lines',
    children: [
      { id: 'files-repositories', text: 'Repositories', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'activities',
    text: 'Activities',
    icon: 'fa-book-open',
    children: [
      { id: 'activities-activities', text: 'Activities', href: '#' },
      { id: 'activities-versions', text: 'Versions', href: '#' },
      { id: 'activities-approve-retries', text: 'Approve Retries', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'qualifications',
    text: 'Qualifications',
    icon: 'fa-graduation-cap',
    children: [
      { id: 'qualifications-requirements', text: 'Requirements', href: '#' },
      { id: 'qualifications-qualifications', text: 'Qualifications', href: '#' },
      { id: 'qualifications-copy', text: 'Copy Qualifications', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'assignments',
    text: 'Assignments',
    icon: 'fa-user-plus',
    children: [
      { id: 'assignments-wizard', text: 'Assign Training Wizard', href: '#' },
      { id: 'assignments-assignments', text: 'Assignments', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'electives',
    text: 'Electives',
    icon: 'fa-star',
    children: [
      { id: 'electives-categories', text: 'Elective Categories', href: '#' },
      { id: 'electives-offer', text: 'Offer Electives', href: '#' },
      { id: 'electives-approve', text: 'Approve Electives', href: '#' },
      { id: 'electives-electives', text: 'Electives', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'authorizations',
    text: 'Authorizations',
    icon: 'fa-unlock-keyhole',
    children: [
      { id: 'authorizations-authorize', text: 'Authorize Training', href: '#' },
      { id: 'authorizations-list', text: 'Authorizations', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'tracking',
    text: 'Tracking And Completions',
    icon: 'fa-layer-group',
    children: [
      { id: 'tracking-credit-wizard', text: 'Credit Wizard', href: '#' },
      { id: 'tracking-import-completions', text: 'Import Completions', href: '#' },
      { id: 'tracking-tasklist', text: 'Track Tasklist Completion', href: '#' },
      { id: 'tracking-attendance', text: 'Take Class Attendance', href: '#' },
      { id: 'tracking-completion-records', text: 'Completion Records', href: '#' },
      { id: 'tracking-duplicates', text: 'Duplicate Completions', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'reports',
    text: 'Reports',
    icon: 'fa-map',
    children: [
      { id: 'reports-recents', text: 'My Recents', href: '#' },
      { id: 'reports-frequent', text: 'Frequently Used', href: '#' },
      { id: 'reports-all', text: 'All Reports', href: '#' },
      { id: 'reports-activity', text: 'Activity Reports', href: '#' },
      { id: 'reports-qualification', text: 'Qualification Reports', href: '#' },
      { id: 'reports-user', text: 'User Reports', href: '#' },
      { id: 'reports-organizational', text: 'Organizational Reports', href: '#' },
      { id: 'reports-scheduled', text: 'Scheduled Reports', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'assets',
    text: 'Assets',
    icon: 'fa-box-archive',
    children: [
      { id: 'assets-groups', text: 'Asset Groups', href: '#' },
      { id: 'assets-assets', text: 'Assets', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'security',
    text: 'Security',
    icon: 'fa-shield-halved',
    children: [
      { id: 'security-roles', text: 'Roles', href: '#' },
      { id: 'security-copy-roles', text: 'Copy Roles', href: '#' },
      { id: 'security-assign-roles', text: 'Assign Roles', href: '#' },
      { id: 'security-role-assignments', text: 'Role Assignments', href: '#' }
    ]
  },
  {
    type: 'group',
    id: 'system',
    text: 'System',
    icon: 'fa-gear',
    children: [
      { id: 'system-jobs', text: 'Jobs', href: '#' },
      { id: 'system-configuration', text: 'Configuration', href: '#' },
      { id: 'system-notifications', text: 'Notifications', href: '#' },
      { id: 'system-landing-page', text: 'Landing Page', href: '#' },
      { id: 'system-user-connections', text: 'User Connections', href: '#' }
    ]
  }
];

const locationTree = [
  {
    id: 'vector-commercial',
    text: 'Vector Commercial',
    regions: [
      {
        id: 'south-central',
        text: 'South Central',
        sites: [
          {
            id: 'houston-aec',
            text: 'Houston AEC Campus',
            departments: [
              {
                id: 'operations',
                text: 'Operations',
                teams: [
                  { id: 'field-leadership', text: 'Field Leadership' },
                  { id: 'safety-admin', text: 'Safety Administration' }
                ]
              },
              {
                id: 'training-services',
                text: 'Training Services',
                teams: [
                  { id: 'content-management', text: 'Content Management' },
                  { id: 'compliance-support', text: 'Compliance Support' }
                ]
              }
            ]
          },
          {
            id: 'dallas-industrial',
            text: 'Dallas Industrial Center',
            departments: [
              {
                id: 'manufacturing-ops',
                text: 'Manufacturing Operations',
                teams: [
                  { id: 'plant-admin', text: 'Plant Administration' },
                  { id: 'line-supervisors', text: 'Line Supervisors' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'pacific',
        text: 'Pacific',
        sites: [
          {
            id: 'portland-pulp',
            text: 'Portland Pulp Division',
            departments: [
              {
                id: 'mill-operations',
                text: 'Mill Operations',
                teams: [
                  { id: 'shift-managers', text: 'Shift Managers' },
                  { id: 'team-coordinators', text: 'Team Coordinators' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

const defaultLocation = {
  organizationId: 'vector-commercial',
  regionId: 'south-central',
  siteId: 'houston-aec',
  departmentId: 'operations',
  teamId: 'field-leadership'
};

async function fetchAdministrationPrototype() {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        quickActions,
        sidenavItems,
        locationTree,
        defaultLocation,
        environmentLabel: 'UAT Environment',
        instanceMeta: 'Version 2.57.0.0 · Instance WN0MDWK0000W2'
      });
    }, 80);
  });
}

window.ConvergenceAdminData = {
  fetchAdministrationPrototype
};
