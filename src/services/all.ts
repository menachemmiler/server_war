import missile from "../models/missile";
import organiz from "../models/organiz";

export const initDatabase = async () => {
  try {
    const allOrganiz = [
      {
        name: "IDF - North",
        resources: [
          {
            name: "Iron Dome",
            amount: 25,
          },
          {
            name: "David's Sling",
            amount: 15,
          },
        ],
        budget: 8000000,
      },
      {
        name: "IDF - South",
        resources: [
          {
            name: "Iron Dome",
            amount: 30,
          },
          {
            name: "Patriot",
            amount: 20,
          },
        ],
        budget: 9000000,
      },
      {
        name: "IDF - Center",
        resources: [
          {
            name: "Iron Dome",
            amount: 40,
          },
          {
            name: "Arrow",
            amount: 10,
          },
        ],
        budget: 10000000,
      },
      {
        name: "IDF - West Bank",
        resources: [
          {
            name: "Iron Dome",
            amount: 10,
          },
        ],
        budget: 7000000,
      },
      {
        name: "Hezbollah",
        resources: [
          {
            name: "Fajr-5",
            amount: 20,
          },
          {
            name: "Zelzal-2",
            amount: 10,
          },
        ],
        budget: 3000000,
      },
      {
        name: "Hamas",
        resources: [
          {
            name: "Qassam",
            amount: 50,
          },
          {
            name: "M-75",
            amount: 30,
          },
        ],
        budget: 2500000,
      },
      {
        name: "IRGC",
        resources: [
          {
            name: "Shahab-3",
            amount: 15,
          },
          {
            name: "Fateh-110",
            amount: 25,
          },
        ],
        budget: 4000000,
      },
      {
        name: "Houthis",
        resources: [
          {
            name: "Badr-1",
            amount: 20,
          },
          {
            name: "Quds-1",
            amount: 15,
          },
        ],
        budget: 2000000,
      },
    ];
    const allMissil = [
      {
        name: "Iron Dome",
        description:
          "A mobile all-weather air defense system designed to intercept and destroy short-range rockets and artillery shells.",
        speed: 3,
        intercepts: ["Qassam", "M-75", "Fajr-5", "Zelzal-2"],
        price: 50000,
      },
      {
        name: "David's Sling",
        description:
          "A mid-to-long range air defense system capable of intercepting large caliber rockets and short-range ballistic missiles.",
        speed: 4,
        intercepts: ["Shahab-3", "Fateh-110", "Quds-1"],
        price: 80000,
      },
      {
        name: "Patriot",
        description:
          "A long-range air defense system that intercepts tactical ballistic missiles, cruise missiles, and advanced aircraft.",
        speed: 5,
        intercepts: ["Shahab-3", "Zelzal-2"],
        price: 100000,
      },
      {
        name: "Arrow",
        description:
          "A family of anti-ballistic missiles designed to intercept and destroy incoming missile threats at high altitudes.",
        speed: 5,
        intercepts: ["Shahab-3", "Fateh-110"],
        price: 120000,
      },
      {
        name: "Qassam",
        description:
          "A simple, locally made rocket used by militant groups for attacks at relatively short distances.",
        speed: 12,
        intercepts: [],
        price: 5000,
      },
      {
        name: "M-75",
        description:
          "A medium-range rocket used by armed groups to target areas beyond the immediate borders.",
        speed: 13,
        intercepts: [],
        price: 15000,
      },
      {
        name: "Fajr-5",
        description:
          "A long-range rocket used for targeting urban centers and military installations.",
        speed: 14,
        intercepts: [],
        price: 30000,
      },
      {
        name: "Zelzal-2",
        description:
          "A heavy artillery rocket designed for long-distance bombardment with significant explosive power.",
        speed: 15,
        intercepts: [],
        price: 45000,
      },
      {
        name: "Shahab-3",
        description:
          "A medium-range ballistic missile developed for strategic strikes, capable of targeting distant locations.",
        speed: 15,
        intercepts: [],
        price: 70000,
      },
      {
        name: "Fateh-110",
        description:
          "A short-range ballistic missile with precision targeting capabilities.",
        speed: 14,
        intercepts: [],
        price: 60000,
      },
      {
        name: "Badr-1",
        description:
          "A short-range ballistic missile used by the Houthis for regional attacks.",
        speed: 13,
        intercepts: [],
        price: 20000,
      },
      {
        name: "Quds-1",
        description:
          "A cruise missile developed by regional forces for longer-range precision attacks.",
        speed: 14,
        intercepts: [],
        price: 40000,
      },
    ];
    const savedM = await missile.insertMany(allMissil);
    const savedO = await organiz.insertMany(allOrganiz);
    return { savedO, savedM };
  } catch (err) {
    console.log(
      "Error accured while creating initial state of candidates",
      err
    );
  }
};

export const getAllOrganizsNameService = async () => {
  try {
    const allOrganizs = await organiz.find({});
    if (!allOrganizs) throw new Error("con't get all organizs");
    return allOrganizs.map((o) => o.name);
  } catch (err: any) {
    console.log("con't get all organizs name", err.message);
  }
};
