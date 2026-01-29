<<<<<<< HEAD
import React, { useCallback } from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
=======
import { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
>>>>>>> 5b398c7f2e1dc63ac17b0f54614318446f14ab44
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";

type ResourceItem = {
  title: string;
<<<<<<< HEAD
  description?: string;
  url: string;
  icon: keyof typeof MaterialIcons.glyphMap;
=======
  description: string;
  url: string;
  tags?: string[];
>>>>>>> 5b398c7f2e1dc63ac17b0f54614318446f14ab44
};

type ResourceSection = {
  title: string;
<<<<<<< HEAD
=======
  icon: keyof typeof MaterialIcons.glyphMap;
>>>>>>> 5b398c7f2e1dc63ac17b0f54614318446f14ab44
  items: ResourceItem[];
};

export default function Resources() {
  const { isDark } = useAppTheme();

<<<<<<< HEAD
  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const borderClass = isDark ? "border-gray-800" : "border-gray-200";

  const openExternal = useCallback(async (url: string) => {
    const safeUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
    try {
      const supported = await Linking.canOpenURL(safeUrl);
      if (supported) {
        await Linking.openURL(safeUrl);
        return;
      }
    } catch {
      // fall through
    }
    try {
      await Linking.openURL(safeUrl);
    } catch {
      // ignore if device blocks it
    }
  }, []);

  const sections: ResourceSection[] = [
    {
      title: "Student Tools",
      items: [
        {
          title: "ctcLink",
          description: "Login to class registration, financials, and student account tools",
          url: "https://myaccount.ctclink.us/",
          icon: "account-circle",
        },
        {
          title: "Canvas (eGator)",
          description: "Access course content, assignments, and announcements",
          url: "https://egator.greenriver.edu/login/saml",
          icon: "dashboard",
        },
        {
          title: "Handshake (Green River student jobs)",
          description: "Find on-campus jobs, work-study postings, and more",
          url: "https://www.greenriver.edu/students/pay-for-college/financial-aid/student-employment/student-guide.html",
          icon: "work",
        },
        {
          title: "Work-Study (eligibility & authorization)",
          description: "Info and documents related to Federal Work-Study at Green River",
          url: "https://www.greenriver.edu/students/pay-for-college/financial-aid/student-employment/",
          icon: "fact-check",
        },
      ],
    },
    {
      title: "Green River Transfer Planning",
      items: [
        {
          title: "Advising for Transfer Students (GRC)",
          description: "Central hub: transfer timeline, resources, and equivalency guides",
          url: "https://www.greenriver.edu/students/academics/career-and-advising-center/advising/transfer-students.html",
          icon: "school",
        },
        {
          title: "University & College Transfer (GRC)",
          description: "Degree planning sheets and transferable associate degrees",
          url: "https://www.greenriver.edu/students/academics/areas-of-interest/university-and-college-transfer/index.html",
          icon: "menu-book",
        },
      ],
    },
    {
      title: "Transfer Equivalency Guides (WA Universities)",
      items: [
        {
          title: "University of Washington (Seattle/Tacoma) — Green River Equivalency Guide",
          description: "Course-by-course equivalencies from Green River to UW",
          url: "https://admit.washington.edu/apply/transfer/equivalency-guide/green-river/",
          icon: "link",
        },
        {
          title: "UW Bothell — Green River Equivalency Guide",
          description: "How Green River courses transfer to UW Bothell",
          url: "https://www.uwb.edu/registrar/policies/community-college-course-equivalency-guide/green-river-college",
          icon: "link",
        },
        {
          title: "Washington State University — Green River Transfer Pathway",
          description: "Transfer pathway information specific to Green River",
          url: "https://admission.wsu.edu/transfer/college/green-river-college/",
          icon: "link",
        },
        {
          title: "Western Washington University — Transfer Equivalency Catalog",
          description: "Use the catalog and filter/select Green River",
          url: "https://admin.wwu.edu/pls/wwis/wwsktcat.TE_Catalog",
          icon: "link",
        },
        {
          title: "Central Washington University — Transfer Equivalency Guide (TES)",
          description: "Public transfer guide; select/search for Green River courses",
          url: "https://tes.collegesource.com/publicview/TES_publicview01.aspx?aid=204fbfdc-36d3-495b-8c0a-5e589b47ca62&rid=e635e8c0-a2e6-4d02-9dd8-71fc4b65ae6b",
          icon: "link",
        },
        {
          title: "Eastern Washington University — Transfer Equivalency Guide (TES)",
          description: "Public transfer guide; select/search for Green River courses",
          url: "https://tes.collegesource.com/publicview/TES_publicview01.aspx?aid=e4fa59cc-4ed8-4ddc-8e34-d3b60be846ae&rid=7898eab1-11c4-4a29-9f3e-6c5b213ef38d",
          icon: "link",
        },
        {
          title: "The Evergreen State College — Green River Transfer Guide (PDF)",
          description: "Evergreen transfer guide for Green River coursework",
          url: "https://www.evergreen.edu/sites/default/files/2023-06/GreenRiver.pdf",
          icon: "picture-as-pdf",
        },
      ],
    },
    {
      title: "Transfer Equivalency Guides (WA Private Colleges)",
      items: [
        {
          title: "Seattle Pacific University — Transfer Pathway (Green River listed)",
          description: "SPU transfer pathway info for WA community colleges (includes Green River)",
          url: "https://spu.edu/admissions/undergraduate/transfer/pathways",
          icon: "link",
        },
        {
          title: "Seattle University — Transfer Equivalency Guide (TES)",
          description: "Public transfer guide; select/search for Green River courses",
          url: "https://tes.collegesource.com/publicview/TES_publicview01.aspx?aid=6b93a5a2-545d-4118-89be-158a22166b20&rid=8bd9f4e6-e0c7-411f-9af8-d4e3527eed23",
          icon: "link",
        },
        {
          title: "Gonzaga University — Transfer Equivalency Guide (TES)",
          description: "Public transfer guide; select/search for Green River courses",
          url: "https://tes.collegesource.com/publicview/TES_publicview01.aspx?aid=edff7e4f-61c0-4b52-a4d2-375105e4d0c6&rid=4e6ce63c-d502-4d1e-9b85-4d01e8856f54",
          icon: "link",
        },
        {
          title: "Pacific Lutheran University — Transfer Guide",
          description: "PLU equivalencies and transfer guide resources",
          url: "https://www.plu.edu/registrar/transfer-guide/",
          icon: "link",
        },
        {
          title: "University of Puget Sound — Green River Transfer Credit Guide (PDF)",
          description: "Transfer credit information for Green River courses",
          url: "https://www.pugetsound.edu/files/2023-08/GreenRiverCommunityCollege.pdf",
          icon: "picture-as-pdf",
        },
        {
          title: "Saint Martin's University — Transfer Equivalency Guide (TES)",
          description: "Public transfer guide; select/search for Green River courses",
          url: "https://tes.collegesource.com/publicview/TES_publicview01.aspx?aid=3e9b8680-6a73-4ff5-a9d7-63b1b1f30bd5&rid=063b2c09-c18b-4df1-b05d-f2c587a6af63",
          icon: "link",
        },
        {
          title: "Whitman College — Transfer Equivalency Guide (TES)",
          description: "Public transfer guide; select/search for Green River courses",
          url: "https://tes.collegesource.com/publicview/TES_publicview01.aspx?aid=ecf0ae06-9d88-40e0-a124-523fc3f61d73&rid=bacb278e-2efc-40d6-b6be-30126b3d5edd",
          icon: "link",
        },
      ],
    },
    {
      title: "Scholarships (Washington)",
      items: [
        {
          title: "CareerOneStop — Scholarship Finder (WA filter)",
          description: "Search scholarships with Washington filter applied",
          url: "https://www.careeronestop.org/Toolkit/Training/find-scholarships.aspx?curPage=1&georestrictionfilter=Washington",
          icon: "attach-money",
        },
        {
          title: "BigFuture — Scholarship Search (WA filter)",
          description: "Scholarship search with Washington selected",
          url: "https://bigfuture.collegeboard.org/scholarship-search?sort=deadline-nearest-first&cntry=US&stt=WA",
          icon: "attach-money",
        },
      ],
    },
    {
      title: "Internships & Jobs",
      items: [
        {
          title: "Washington State Government Internships (GovernmentJobs)",
          description: "Internship postings across WA state agencies",
          url: "https://www.governmentjobs.com/careers/washington?jobType[0]=Internship&sort=PostingDate%7CDescending",
          icon: "work",
        },
        {
          title: "WSOS Job Board",
          description: "Jobs and internships (Washington State Opportunity Scholarship)",
          url: "https://waopportunityscholarship.org/jobs/",
          icon: "work",
        },
        {
          title: "Parker Dewey Micro-Internships",
          description: "Short-term paid projects to build experience",
          url: "https://www.parkerdewey.com/",
          icon: "work-outline",
        },
      ],
    },
    {
      title: "International Internships",
      items: [
        {
          title: "AIESEC Global Talent",
          description: "International internships (global placements)",
          url: "https://aiesec.org/global-talent",
          icon: "public",
        },
        {
          title: "Go Overseas — Internships Abroad",
          description: "Browse internship abroad programs and job board listings",
          url: "https://www.gooverseas.com/internships-abroad",
          icon: "public",
        },
        {
          title: "IAESTE — Explore Internships",
          description: "International STEM-focused internships (availability varies)",
          url: "https://iaeste.org/internships",
          icon: "public",
        },
      ],
    },
  ];

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
        <View className="max-w-md w-full self-center">
          <View className="px-6 pt-10 pb-6">
            <Text className={`text-2xl ${textClass}`}>Resources</Text>
            <Text className={`${secondaryTextClass} mt-1`}>
              Transfer planning, equivalency guides, scholarships, internships, and student tools
            </Text>
          </View>

          <View className="px-6 gap-6">
            {sections.map((section) => (
              <View key={section.title}>
                <Text className={`text-sm ${secondaryTextClass} mb-3 px-2`}>{section.title}</Text>

                <View className={`${cardBgClass} border rounded-2xl overflow-hidden`}>
                  {section.items.map((item, index) => (
                    <Pressable
                      key={`${section.title}-${item.title}`}
                      onPress={() => openExternal(item.url)}
                      className={`flex-row items-center px-4 py-5 ${
                        index !== section.items.length - 1 ? `border-b ${borderClass}` : ""
                      }`}
                      accessibilityRole="link"
                    >
                      <MaterialIcons name={item.icon} size={20} color="#22C55E" />
                      <View className="flex-1 ml-3">
                        <Text className={`${textClass} font-medium`}>{item.title}</Text>
                        {item.description ? (
                          <Text className={`text-xs ${secondaryTextClass} mt-1`} numberOfLines={2}>
                            {item.description}
                          </Text>
                        ) : null}
                      </View>
                      <MaterialIcons name="open-in-new" size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}

            <Text className={`text-center text-xs ${isDark ? "text-gray-600" : "text-gray-400"} mt-2`}>
              Links open in your device browser.
=======
  const [query, setQuery] = useState("");

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardClass = isDark
    ? "bg-gray-900/80 border-gray-800"
    : "bg-white/90 border-gray-200";
  const inputClass = isDark
    ? "bg-gray-900/80 border-gray-800"
    : "bg-white/90 border-gray-200";
  const borderClass = isDark ? "border-gray-800" : "border-gray-200";
  const placeholderTextColor = isDark ? "#9CA3AF" : "#6B7280";

  const sections: ResourceSection[] = useMemo(
    () => [
      {
        title: "Green River College",
        icon: "school",
        items: [
          {
            title: "Career & Advising Center",
            description:
              "Advising, career planning, and student support services.",
            url: "https://www.greenriver.edu/students/academics/career-and-advising-center/index.html",
            tags: ["advising", "career", "grc"],
          },
          {
            title: "Transfer Students (GRC)",
            description:
              "Transfer advising services and resources for GRC students.",
            url: "https://www.greenriver.edu/students/academics/career-and-advising-center/advising/transfer-students.html",
            tags: ["transfer", "advising", "grc"],
          },
          {
            title: "University & College Transfer Hub (GRC)",
            description:
              "Central transfer area: planning sheets, pathways, and transfer info.",
            url: "https://www.greenriver.edu/students/academics/areas-of-interest/university-and-college-transfer/",
            tags: ["transfer", "planning", "grc"],
          },
          {
            title: "Handshake (Jobs/Internships)",
            description:
              "Job and internship platform commonly used by colleges (login required).",
            url: "https://app.joinhandshake.com/login",
            tags: ["jobs", "internships", "handshake"],
          },
          {
            title: "Student Employment / Work-Study (GRC)",
            description:
              "Work-study + on-campus student employment info and eligibility.",
            url: "https://www.greenriver.edu/students/pay-for-college/financial-aid/student-employment/",
            tags: ["work-study", "jobs", "financial aid", "grc"],
          },
        ],
      },
      {
        title: "Student Portals",
        icon: "account-circle",
        items: [
          {
            title: "ctcLink",
            description:
              "Washington community and technical college student portal (registration, financial aid, account).",
            url: "https://myaccount.ctclink.us/",
            tags: ["ctclink", "portal", "registration", "financial aid"],
          },
          {
            title: "Canvas (eGator)",
            description:
              "Green River Canvas login (course materials, assignments, announcements).",
            url: "https://egator.greenriver.edu/login/saml",
            tags: ["canvas", "egator", "lms", "classes"],
          },
        ],
      },
      {
        title: "UW Transfer Credit (GRC → UW)",
        icon: "find-in-page",
        items: [
          {
            title: "UW Equivalency Guide (Green River College)",
            description:
              "How Green River College courses transfer to the University of Washington.",
            url: "https://admit.washington.edu/apply/transfer/equivalency-guide/green-river/",
            tags: ["uw", "equivalency", "transfer credit", "grc"],
          },
        ],
      },
      {
        title: "Scholarships & Funding (WA-focused)",
        icon: "attach-money",
        items: [
          {
            title: "theWashBoard (WA Scholarships)",
            description:
              "Washington scholarship matching service (WSAC). Build a profile and match.",
            url: "https://washboard.wsac.wa.gov/",
            tags: ["scholarships", "washington", "wsac"],
          },
          {
            title: "Washington State Opportunity Scholarship (WSOS)",
            description:
              "Scholarships for WA students (including transfer paths for eligible majors).",
            url: "https://waopportunityscholarship.org/",
            tags: ["wsos", "scholarships", "washington"],
          },
          {
            title: "CareerOneStop Scholarship Finder (Washington)",
            description:
              "Scholarship search filtered to Washington-related opportunities.",
            url: "https://www.careeronestop.org/Toolkit/Training/find-scholarships.aspx?curPage=1&georestrictionfilter=Washington",
            tags: ["scholarships", "washington", "search"],
          },
          {
            title: "BigFuture Scholarship Search (WA)",
            description:
              "College Board scholarship search filtered to Washington; sorted by nearest deadline.",
            url: "https://bigfuture.collegeboard.org/scholarship-search?sort=deadline-nearest-first&cntry=US&stt=WA",
            tags: ["scholarships", "washington", "deadline"],
          },
          {
            title: "Jack Kent Cooke Undergraduate Transfer Scholarship",
            description:
              "Highly selective scholarship for community college transfer students.",
            url: "https://www.jkcf.org/our-scholarships/undergraduate-transfer-scholarship/",
            tags: ["jkcf", "transfer scholarship", "top students"],
          },
        ],
      },
      {
        title: "Internships & Jobs",
        icon: "work",
        items: [
          {
            title: "WSOS Job Board",
            description:
              "Job board connected to Washington State Opportunity Scholarship partners and opportunities.",
            url: "https://waopportunityscholarship.org/jobs/",
            tags: ["wsos", "jobs", "washington"],
          },
          {
            title: "Washington State Internships (GovernmentJobs)",
            description: "WA internship postings (filter applied).",
            url: "https://www.governmentjobs.com/careers/washington?jobType[0]=Internship&sort=PostingDate%7CDescending",
            tags: ["internships", "washington", "governmentjobs"],
          },
          {
            title: "WA Legislature Internship Program",
            description:
              "Civic education internship program during the legislative session.",
            url: "https://leg.wa.gov/learn-and-participate/civic-education-programs/internship-program/",
            tags: ["internships", "policy", "washington"],
          },
          {
            title: "NASA Internship Programs",
            description: "NASA internships (STEM and non-STEM opportunities).",
            url: "https://www.nasa.gov/learning-resources/internship-programs/",
            tags: ["internships", "nasa", "stem"],
          },
          {
            title: "U.S. Dept. of State Student Internship Program",
            description:
              "Internships with the Department of State (domestic + overseas).",
            url: "https://careers.state.gov/interns-fellows/student-internship-program/",
            tags: ["internships", "international", "state department"],
          },
          {
            title: "United Nations Internships Info",
            description:
              "UN internship info and where to search in the UN careers portal.",
            url: "https://www.un.org/en/academic-impact/page/internships",
            tags: ["internships", "international", "un"],
          },
        ],
      },
    ],
    []
  );

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;

    const matches = (item: ResourceItem) => {
      const haystack =
        (item.title +
          " " +
          item.description +
          " " +
          (item.tags ?? []).join(" ")).toLowerCase();
      return haystack.includes(q);
    };

    return sections
      .map((s) => ({ ...s, items: s.items.filter(matches) }))
      .filter((s) => s.items.length > 0);
  }, [query, sections]);

  const openLink = async (url: string) => {
    try {
      const can = await Linking.canOpenURL(url);
      if (!can) {
        Alert.alert("Cannot open link", "Your device could not open this link.");
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert("Link error", "Something went wrong opening that link.");
    }
  };

  return (
    <ScreenBackground>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 96 }}
      >
        <View className="max-w-md w-full self-center px-6 pt-10">
          <Text className={`text-2xl ${textClass} mb-1`}>Resources</Text>
          <Text className={`${secondaryTextClass} mb-6`}>
            Official links for transfer planning, scholarships, and internships
          </Text>

          {/* Search */}
          <View className="relative mb-6">
            <View className="absolute left-4 top-1/2 -translate-y-1/2">
              <Ionicons
                name="search"
                size={18}
                color={placeholderTextColor}
              />
            </View>

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search resources (e.g., UW, work-study, scholarships)"
              placeholderTextColor={placeholderTextColor}
              className={`w-full ${inputClass} ${textClass} border rounded-2xl pl-12 pr-4 py-4`}
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Sections */}
          {filteredSections.length === 0 ? (
            <View className={`${cardClass} border rounded-2xl p-5`}>
              <Text className={`${textClass} mb-1`}>No matches found</Text>
              <Text className={`${secondaryTextClass} text-sm`}>
                Try a different search term.
              </Text>
            </View>
          ) : (
            <View className="gap-6">
              {filteredSections.map((section) => (
                <View key={section.title}>
                  <View className="flex-row items-center mb-3 px-2">
                    <MaterialIcons
                      name={section.icon}
                      size={18}
                      color={isDark ? "#9CA3AF" : "#6B7280"}
                    />
                    <Text className={`${textClass} ml-2`}>
                      {section.title}
                    </Text>
                  </View>

                  <View
                    className={`${cardClass} border rounded-2xl overflow-hidden`}
                  >
                    {section.items.map((item, idx) => (
                      <Pressable
                        key={item.title}
                        onPress={() => openLink(item.url)}
                        className={`px-4 py-5 flex-row items-start ${
                          idx !== section.items.length - 1
                            ? `border-b ${borderClass}`
                            : ""
                        }`}
                      >
                        <View className="mt-0.5">
                          <Ionicons
                            name="link-outline"
                            size={18}
                            color={isDark ? "#9CA3AF" : "#6B7280"}
                          />
                        </View>

                        <View className="flex-1 ml-3">
                          <Text
                            className={`${textClass} font-medium mb-1`}
                          >
                            {item.title}
                          </Text>
                          <Text className={`${secondaryTextClass} text-sm`}>
                            {item.description}
                          </Text>
                        </View>

                        <MaterialIcons
                          name="open-in-new"
                          size={18}
                          color={isDark ? "#9CA3AF" : "#6B7280"}
                        />
                      </Pressable>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          <View className="mt-8">
            <Text
              className={`text-xs ${
                isDark ? "text-gray-600" : "text-gray-400"
              } text-center`}
            >
              Links open in your device’s browser.
>>>>>>> 5b398c7f2e1dc63ac17b0f54614318446f14ab44
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
