import avatarPersonnel from './assets/avatar-personnel.svg'

const data = {
  UserId: 'f7e4e21b-8725-4273-9b3f-abab0134415c',
  FirstName: 'Bob',
  LastName: 'Snyder',
  EmailAddress: 'ceo@heliostest.net',
  PhoneNumber: '(999)999-9999',
  OrganizationDistance: 0,
  TeamCount: 173,
  LeadCount: null,
}
export const tree = {
  id: data.UserId,
  person: {
    id: data.UserId,
    department: '',
    name: `${data.FirstName} ${data.LastName}`,
    title: data.EmailAddress,
    totalReports: data.TeamCount,
    nodeStatusColor: 'red',
    hasChild: true,
    hasImage: true,
    avatar:
      'data:image/jpeg;base64,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',
    ...data,
  },
  hasChild: data.TeamCount >= 1,
  hasParent: false,
  children: [],
  nodeStatusColor: 'red',
}

export const tree1 = [
  {
    id: 36,
    person: {
      id: 36,
      avatar: avatarPersonnel,
      department: '',
      name: 'Tomasz polaski',
      title: 'IT Specialist',
      totalReports: 4,
    },
    hasChild: true,
    hasParent: true,
    // children: [],
  },
  {
    id: 32,
    person: {
      id: 32,
      avatar: avatarPersonnel,
      department: '',
      name: 'Emanuel walker',
      title: 'IT Specialist',
      totalReports: 0,
    },
    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 25,
    person: {
      id: 25,
      avatar: avatarPersonnel,
      department: '',
      name: 'Kerry peter',
      title: 'IT Specialist',
      totalReports: 3,
    },
    hasChild: true,
    hasParent: true,
    // children: [],
  },
]

export const tree2 = [
  {
    id: 56,
    person: {
      id: 56,
      avatar: avatarPersonnel,
      department: '',
      name: 'Sam John',
      title: 'HR',
      totalReports: 2,
      link: 'https://github.com/unicef/react-org-chart',
    },
    hasChild: true,
    hasParent: true,
    // children: [],
  },
  {
    id: 66,
    person: {
      id: 66,
      avatar: avatarPersonnel,
      department: '',
      name: 'John doe',
      title: 'Developer',
      totalReports: 0,
      link: 'https://github.com/unicef/react-org-chart',
    },
    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 76,
    person: {
      id: 76,
      avatar: avatarPersonnel,
      department: '',
      name: 'Emilia rogers',
      title: 'Developer',
      totalReports: 0,
      link: 'https://github.com/unicef/react-org-chart',
    },
    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 60,
    person: {
      id: 60,
      avatar: avatarPersonnel,
      department: '',
      name: 'Ellen cott',
      title: 'IT Officer',
      totalReports: 0,
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },
]

export const tree3 = [
  {
    id: 70,
    person: {
      id: 70,
      avatar: avatarPersonnel,
      department: '',
      name: 'Kenneth dom',
      title: 'IT Officer',
      totalReports: 0,
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },
  {
    id: 45,
    person: {
      id: 45,
      avatar: avatarPersonnel,
      department: '',
      name: 'Kin baker',
      title: 'IT Officer',
      totalReports: 0,
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },
]

export const tree4 = [
  {
    id: 102,
    person: {
      id: 102,
      avatar: avatarPersonnel,
      department: '',
      name: 'Hendy kinger',
      title: 'Manager',
      totalReports: 0,
    },
    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 455,
    person: {
      id: 455,
      avatar: avatarPersonnel,
      department: '',
      name: 'Kate baker',
      title: 'IT Officer',
      totalReports: 0,
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },
  {
    id: 444,
    person: {
      id: 444,
      avatar: avatarPersonnel,
      department: '',
      name: 'John medis',
      title: 'IT Officer',
      totalReports: 0,
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },

  {
    id: 456,
    person: {
      id: 456,
      avatar: avatarPersonnel,
      department: '',
      name: 'Brett lee',
      title: 'IT Officer',
      totalReports: 0,
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },
]
