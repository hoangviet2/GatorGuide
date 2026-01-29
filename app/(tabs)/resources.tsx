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
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";

type ResourceItem = {
  title: string;
  description: string;
  url: string;
  tags?: string[];
};

type ResourceSection = {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  items: ResourceItem[];
};

export default function Resources() {
  const { isDark } = useAppTheme();

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
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
