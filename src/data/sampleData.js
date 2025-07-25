// src/data/sampleData.js

export const sampleUsers = [
  {
    id: 1,
    firstName: "Ahmet",
    lastName: "Yılmaz",
    email: "ahmet.yilmaz@email.com",
    phone: "0532 123 45 67",
    policies: [
      {
        id: 101,
        insuranceCompany: "Axa Sigorta",
        policyNumber: "AXA-2024-001234",
        type: "Kasko",
        premium: 3500,
        startDate: "2024-01-15",
        endDate: "2025-01-15",
        vehicleInfo: { 
          plate: "34 ABC 123", 
          brand: "Toyota", 
          model: "Corolla", 
          year: 2020 
        }
      },
      {
        id: 102,
        insuranceCompany: "Allianz",
        policyNumber: "ALZ-2024-005678",
        type: "Trafik",
        premium: 850,
        startDate: "2024-03-10",
        endDate: "2025-03-10",
        vehicleInfo: { 
          plate: "34 ABC 123", 
          brand: "Toyota", 
          model: "Corolla", 
          year: 2020 
        }
      }
    ]
  },
  {
    id: 2,
    firstName: "Elif",
    lastName: "Kaya", 
    email: "elif.kaya@email.com",
    phone: "0533 987 65 43",
    policies: [
      {
        id: 201,
        insuranceCompany: "Mapfre",
        policyNumber: "MAP-2024-009876",
        type: "Kasko",
        premium: 4200,
        startDate: "2024-02-20",
        endDate: "2025-02-20",
        vehicleInfo: { 
          plate: "06 XYZ 456", 
          brand: "BMW", 
          model: "320i", 
          year: 2021 
        }
      }
    ]
  },
  {
    id: 3,
    firstName: "Mehmet",
    lastName: "Demir",
    email: "mehmet.demir@email.com", 
    phone: "0534 456 78 90",
    policies: [
      {
        id: 301,
        insuranceCompany: "Aksigorta",
        policyNumber: "AKS-2024-112233",
        type: "Trafik",
        premium: 920,
        startDate: "2024-01-05",
        endDate: "2025-01-05",
        vehicleInfo: { 
          plate: "35 DEF 789", 
          brand: "Renault", 
          model: "Clio", 
          year: 2019 
        }
      }
    ]
  },
  {
    id: 4,
    firstName: "Ayşe",
    lastName: "Özkan",
    email: "ayse.ozkan@email.com",
    phone: "0535 321 65 98", 
    policies: [
      {
        id: 401,
        insuranceCompany: "Zurich Sigorta",
        policyNumber: "ZUR-2024-778899",
        type: "Kasko",
        premium: 5600,
        startDate: "2024-06-01",
        endDate: "2025-06-01",
        vehicleInfo: { 
          plate: "16 GHI 012", 
          brand: "Mercedes", 
          model: "C200", 
          year: 2022 
        }
      }
    ]
  },
  {
    id: 5,
    firstName: "Can",
    lastName: "Arslan",
    email: "can.arslan@email.com",
    phone: "0536 789 12 34",
    policies: [
      {
        id: 501,
        insuranceCompany: "Groupama",
        policyNumber: "GRP-2024-334455", 
        type: "Trafik",
        premium: 750,
        startDate: "2024-05-15",
        endDate: "2025-05-15",
        vehicleInfo: { 
          plate: "07 JKL 345", 
          brand: "Fiat", 
          model: "Egea", 
          year: 2018 
        }
      }
    ]
  }
];

export const dashboardStats = {
  totalCustomers: 5,
  totalPolicies: 8,
  monthlyPolicies: 3,
  upcomingRenewals: 2,
  totalPremium: 25720,
  monthlyPremium: 8700
};

export const insuranceCompanies = [
  "Axa Sigorta",
  "Allianz", 
  "Mapfre",
  "Aksigorta",
  "HDI Sigorta",
  "Zurich Sigorta",
  "Groupama",
  "Güneş Sigorta"
];

export const insuranceTypes = [
  "Kasko",
  "Trafik",
  "DASK", 
  "Seyahat",
  "Sağlık",
  "Hayat"
];