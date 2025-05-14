// import React from "react";
// import { Column, Heading, Text, Flex, Button, Icon, Card, SmartLink } from "@/once-ui/components";
// import { contact, company } from "@/app/resources/content";
// import { Meta } from "@/once-ui/modules";
// import { baseURL } from "@/app/resources";

// export async function generateMetadata() {
//   return Meta.generate({
//     title: `聯絡我們 - ${company.name}`,
//     description: "聯絡穩智科創有限公司，獲得專業的技術諮詢與服務",
//     baseURL: baseURL,
//     path: "/contact",
//   });
// }

// export default function Contact() {
//   return (
//     <Column maxWidth="m" gap="xl">
//       <Column maxWidth="s">
//         <Heading variant="display-strong-s" marginBottom="m">
//           聯絡我們
//         </Heading>
//         <Text variant="body-strong-m" onBackground="neutral-weak">
//           歡迎與我們聯繫，無論是產品諮詢、技術支援或商業合作，我們都很樂意為您服務。
//         </Text>
//       </Column>

//       <Flex fillWidth gap="24" mobileDirection="column">
//         <Column flex={2} gap="24">
//           <Card padding="24" background="surface">
//             <Heading variant="heading-strong-l" marginBottom="16">
//               聯絡資訊
//             </Heading>
            
//             <Column gap="16">
//               <Flex gap="12" vertical="start">
//                 <Icon name="location" size="l" />
//                 <Column>
//                   <Text variant="body-strong-m">公司地址</Text>
//                   <Text variant="body-default-m" onBackground="neutral-weak">
//                     {contact.address}
//                   </Text>
//                   <Text variant="body-default-s" onBackground="neutral-weak">
//                     {contact.addressEn}
//                   </Text>
//                 </Column>
//               </Flex>

//               <Flex gap="12" vertical="start">
//                 <Icon name="phone" size="l" />
//                 <Column>
//                   <Text variant="body-strong-m">聯絡電話</Text>
//                   <SmartLink href={`tel:${contact.phone}`}>
//                     <Text variant="body-default-m" onBackground="brand-weak">
//                       {contact.phone}
//                     </Text>
//                   </SmartLink>
//                 </Column>
//               </Flex>

//               <Flex gap="12" vertical="start">
//                 <Icon name="email" size="l" />
//                 <Column>
//                   <Text variant="body-strong-m">電子郵件</Text>
//                   <SmartLink href={`mailto:${contact.email}`}>
//                     <Text variant="body-default-m" onBackground="brand-weak">
//                       {contact.email}
//                     </Text>
//                   </SmartLink>
//                 </Column>
//               </Flex>

//               <Flex gap="12" vertical="start">
//                 <Icon name="clock" size="l" />
//                 <Column>
//                   <Text variant="body-strong-m">營業時間</Text>
//                   <Text variant="body-default-m" onBackground="neutral-weak">
//                     {contact.businessHours}
//                   </Text>
//                 </Column>
//               </Flex>
//             </Column>
//           </Card>

//           <Card padding="24" background="surface">
//             <Heading variant="heading-strong-l" marginBottom="16">
//               如何前往
//             </Heading>
//             <Column gap="12">
//               <Text variant="body-default-m" onBackground="neutral-weak">
//                 我們位於臺中市大肚區，交通便利，歡迎親臨參觀。
//               </Text>
//               <Button
//                 href="https://maps.google.com"
//                 variant="secondary"
//                 suffixIcon="arrowUpRightFromSquare"
//               >
//                 在 Google 地圖上查看
//               </Button>
//             </Column>
//           </Card>
//         </Column>

//         <Column flex={1} gap="24">
//           <Card padding="24" background="surface">
//             <Heading variant="heading-strong-l" marginBottom="16">
//               服務項目
//             </Heading>
//             <Column gap="12">
//               <Flex gap="8" vertical="center">
//                 <Icon name="check" />
//                 <Text variant="body-default-m">機械設備製造</Text>
//               </Flex>
//               <Flex gap="8" vertical="center">
//                 <Icon name="check" />
//                 <Text variant="body-default-m">電子零組件製造</Text>
//               </Flex>
//               <Flex gap="8" vertical="center">
//                 <Icon name="check" />
//                 <Text variant="body-default-m">電腦週邊設備製造</Text>
//               </Flex>
//               <Flex gap="8" vertical="center">
//                 <Icon name="check" />
//                 <Text variant="body-default-m">資訊軟體服務</Text>
//               </Flex>
//               <Flex gap="8" vertical="center">
//                 <Icon name="check" />
//                 <Text variant="body-default-m">系統整合服務</Text>
//               </Flex>
//               <Flex gap="8" vertical="center">
//                 <Icon name="check" />
//                 <Text variant="body-default-m">技術諮詢服務</Text>
//               </Flex>
//             </Column>
//           </Card>

//           <Card padding="24" background="brand-alpha-weak">
//             <Icon name="lightbulb" size="xl" marginBottom="12" />
//             <Heading variant="heading-strong-m" marginBottom="12">
//               立即聯絡
//             </Heading>
//             <Text variant="body-default-m" marginBottom="16">
//               有任何問題或需求嗎？我們的專業團隊隨時準備為您提供協助。
//             </Text>
//             <Button
//               href={`tel:${contact.phone}`}
//               variant="primary"
//               suffixIcon="phone"
//               fillWidth
//             >
//               撥打電話諮詢
//             </Button>
//           </Card>
//         </Column>
//       </Flex>

//       <Column fillWidth background="surface" padding="40" radius="l" center gap="24">
//         <Heading variant="heading-strong-xl" align="center">
//           期待與您合作
//         </Heading>
//         <Text variant="body-default-l" align="center" onBackground="neutral-weak" maxWidth="s">
//           {company.name}致力於提供最優質的產品與服務，期待能成為您事業發展的最佳夥伴。
//         </Text>
//         <Flex gap="16" wrap horizontal="center">
//           <Button
//             href="/work"
//             variant="secondary"
//             size="l"
//           >
//             瀏覽產品與服務
//           </Button>
//           <Button
//             href="/about"
//             variant="secondary" 
//             size="l"
//           >
//             了解更多關於我們
//           </Button>
//         </Flex>
//       </Column>
//     </Column>
//   );
// }