// Membership and volunteer information.

export const membershipInfo = {
  introEn: 'Membership connects people who want to support the organization\'s work for human rights, equality, access to justice, mediation, and peaceful communities.',
  introNp: 'सदस्यताले मानव अधिकार, समानता, न्यायमा पहुँच, मेलमिलाप र शान्तिपूर्ण समुदाय निर्माणमा संस्थाको कामलाई सहयोग गर्न चाहने व्यक्तिहरूलाई जोड्दछ।',
  categories: [
    {
      id: 'general',
      titleEn: 'General Member', titleNp: 'साधारण सदस्य',
      feeEn: 'NPR 200 entrance fee + NPR 500 annual fee', feeNp: 'प्रवेश शुल्क रु. २०० + वार्षिक शुल्क रु. ५००',
      detailEn: 'Open to eligible applicants who meet the membership requirements in the constitution.',
      detailNp: 'विधानमा तोकिएका सदस्यता आवश्यकताहरू पूरा गर्ने योग्य आवेदकका लागि।',
    },
    {
      id: 'life',
      titleEn: 'Life Member', titleNp: 'आजीवन सदस्य',
      feeEn: 'NPR 10,000 one-time fee', feeNp: 'एकमुष्ट शुल्क रु. १०,०००',
      detailEn: 'A one-time membership option for long-term supporters of the organization.',
      detailNp: 'संस्थालाई दीर्घकालीन रूपमा सहयोग गर्ने सदस्यका लागि एकमुष्ट सदस्यता।',
    },
    {
      id: 'honorary',
      titleEn: 'Honorary Member', titleNp: 'मानार्थ सदस्य',
      feeEn: 'No fee stated', feeNp: 'शुल्क उल्लेख गरिएको छैन',
      detailEn: 'May be given to distinguished social workers or respected individuals. Honorary members do not have voting rights.',
      detailNp: 'विशिष्ट समाजसेवी वा सम्मानित व्यक्तिलाई प्रदान गर्न सकिने सदस्यता। मानार्थ सदस्यलाई मतदानको अधिकार हुँदैन।',
    },
    {
      id: 'founder',
      titleEn: 'Founding Member', titleNp: 'संस्थापक सदस्य',
      detailEn: 'Recognizes the founding members of the organization.',
      detailNp: 'संस्थाका संस्थापक सदस्यलाई जनाउने सदस्यता।',
      linkEn: 'Meet the founding members', linkNp: 'संस्थापक सदस्यहरूको सूची हेर्नुहोस्', linkUrl: '/about#founding-members',
    },
  ],
  processEn: 'Please contact REPC–NEPAL for the application form, eligibility requirements, and current payment instructions before applying.',
  processNp: 'आवेदन दिनुअघि आवेदन फारम, योग्यता र हालको भुक्तानी प्रक्रियाका लागि REPC–NEPAL मा सम्पर्क गर्नुहोस्।',
};

export const volunteerAreas = [
  { id: 'legal', titleEn: 'Legal Volunteer', titleNp: 'कानुनी स्वयंसेवक', descEn: 'For law students and practicing advocates — support our legal aid clinics.', descNp: 'कानुनका विद्यार्थी र अभ्यासरत अधिवक्ताका लागि — हाम्रा कानुनी सहायता शिविरमा सहयोग गर्नुहोस्।' },
  { id: 'mediation', titleEn: 'Mediator / Peacebuilder', titleNp: 'मेलमिलापकर्ता / शान्ति निर्माता', descEn: 'Get trained and help resolve community disputes through mediation.', descNp: 'तालिम लिनुहोस् र मेलमिलापमार्फत सामुदायिक विवाद समाधानमा सहयोग गर्नुहोस्।' },
  { id: 'outreach', titleEn: 'Community Outreach', titleNp: 'सामुदायिक पहुँच', descEn: 'Help raise awareness of rights and services in your community.', descNp: 'आफ्नो समुदायमा अधिकार र सेवाहरूबारे सचेतना फैलाउन सहयोग गर्नुहोस्।' },
  { id: 'events', titleEn: 'Events & Admin Support', titleNp: 'कार्यक्रम तथा प्रशासनिक सहयोग', descEn: 'Assist with program logistics, documentation, and office work.', descNp: 'कार्यक्रम व्यवस्थापन, अभिलेखीकरण र कार्यालय कामकाजमा सहयोग गर्नुहोस्।' },
  { id: 'professional', titleEn: 'Pro Bono Professional', titleNp: 'नि:शुल्क व्यावसायिक सेवा', descEn: 'Offer design, IT, finance, or research skills to the organization pro bono.', descNp: 'संस्थालाई डिजाइन, IT, वित्त, वा अनुसन्धान सीप नि:शुल्क रूपमा प्रदान गर्नुहोस्।' },
];
