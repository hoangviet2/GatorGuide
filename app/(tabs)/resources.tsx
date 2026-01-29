import React, { useCallback } from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";

type ResourceItem = {
  title: string;
  description?: string;
  url: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

type ResourceSection = {
  title: string;
  items: ResourceItem[];
};

export default function Resources() {
  const { isDark } = useAppTheme();

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
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
