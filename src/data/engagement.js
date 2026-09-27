// Membership and volunteer information.

export const membershipInfo = {
  introEn: 'Membership connects people who want to support the organization\'s work for human rights, equality, access to justice, mediation, and peaceful communities.',
  introNp: 'सदस्यतामार्फत मानव अधिकारको संरक्षण, समानता, न्यायमा पहुँच, मेलमिलाप तथा शान्तिपूर्ण समाज निर्माणमा संस्थाको उद्देश्य र कार्यक्रमसँग सहकार्य गर्न इच्छुक व्यक्तिहरू संस्थासँग आबद्ध हुन सक्नुहुन्छ।',
  categories: [
    {
      id: 'general',
      titleEn: 'General Member', titleNp: 'साधारण सदस्य',
      feeEn: 'NPR 200 entrance fee + NPR 500 annual fee', feeNp: 'प्रवेश शुल्क रु. २०० तथा वार्षिक शुल्क रु. ५००',
      detailEn: 'Open to eligible applicants who meet the membership requirements in the constitution.',
      detailNp: 'विधानमा तोकिएका सदस्यता सम्बन्धी योग्यता तथा आवश्यकताहरू पूरा गर्ने योग्य नेपाली नागरिकका लागि।',
    },
    {
      id: 'life',
      titleEn: 'Life Member', titleNp: 'आजीवन सदस्य',
      feeEn: 'NPR 10,000 one-time fee', feeNp: 'एकमुष्ट शुल्क रु. १०,०००',
      detailEn: 'A one-time membership option for long-term supporters of the organization.',
      detailNp: 'संस्थाको विकास तथा दीर्घकालीन उद्देश्यमा विशेष सहयोग पुर्‍याउने व्यक्तिका लागि एकमुष्ट आजीवन सदस्यता।',
    },
    {
      id: 'honorary',
      titleEn: 'Honorary Member', titleNp: 'मानार्थ सदस्य',
      feeEn: 'No fee stated', feeNp: 'शुल्क उल्लेख गरिएको छैन',
      detailEn: 'May be given to distinguished social workers or respected individuals. Honorary members do not have voting rights.',
      detailNp: 'विशिष्ट समाजसेवी, प्रतिष्ठित वा उपयुक्त ठहरिएका व्यक्तिलाई प्रदान गर्न सकिने मानार्थ सदस्यता। मानार्थ सदस्यलाई मतदानको अधिकार रहने छैन।',
    },
    {
      id: 'founder',
      titleEn: 'Founding Member', titleNp: 'संस्थापक सदस्य',
      detailEn: 'Recognizes the founding members of the organization.',
      detailNp: 'संस्थाको स्थापनामा सक्रिय रूपमा सहभागी भएका संस्थापक सदस्यलाई जनाउने सदस्यता।',
      linkEn: 'Meet the founding members', linkNp: 'संस्थापक सदस्यहरूको विवरण हेर्नुहोस्', linkUrl: '/founding-members',
    },
  ],
  processEn: 'Please contact REPC–NEPAL for the application form, eligibility requirements, and current payment instructions before applying.',
  processNp: 'आवेदन पेश गर्नुअघि आवेदन फाराम, योग्यता तथा हाल प्रचलित भुक्तानी प्रक्रियासम्बन्धी जानकारीका लागि REPC–NEPAL मा सम्पर्क गर्नुहोस्।',
};

export const volunteerAreas = [
  { id: 'legal', titleEn: 'Legal Volunteer', titleNp: 'कानुनी स्वयंसेवक', descEn: 'For law students and practicing advocates — support our legal aid clinics.', descNp: 'कानुनका विद्यार्थी र अभ्यासरत अधिवक्ताका लागि — हाम्रा कानुनी सहायता शिविरमा सहयोग गर्नुहोस्।' },
  { id: 'mediation', titleEn: 'Mediator / Peacebuilder', titleNp: 'मेलमिलापकर्ता / शान्ति निर्माण सहकर्मी', descEn: 'Get trained and help resolve community disputes through mediation.', descNp: 'सम्बन्धित तालिम प्राप्त गरी मेलमिलापमार्फत सामुदायिक विवाद समाधानमा योगदान पुर्‍याउनुहोस्।' },
  { id: 'outreach', titleEn: 'Community Outreach', titleNp: 'सामुदायिक पहुँच', descEn: 'Help raise awareness of rights and services in your community.', descNp: 'आफ्नो समुदायमा अधिकार तथा उपलब्ध सेवासम्बन्धी सचेतना अभिवृद्धिमा सहयोग गर्नुहोस्।' },
  { id: 'events', titleEn: 'Events & Admin Support', titleNp: 'कार्यक्रम तथा प्रशासनिक सहयोग', descEn: 'Assist with program logistics, documentation, and office work.', descNp: 'कार्यक्रम व्यवस्थापन, अभिलेखीकरण तथा कार्यालयीय कार्यमा सहयोग पुर्‍याउनुहोस्।' },
  { id: 'professional', titleEn: 'Pro Bono Professional', titleNp: 'नि:शुल्क व्यावसायिक सेवा', descEn: 'Offer design, IT, finance, or research skills to the organization pro bono.', descNp: 'संस्थालाई डिजाइन, सूचना प्रविधि, वित्त वा अनुसन्धानसम्बन्धी विशेषज्ञता नि:शुल्क रूपमा उपलब्ध गराउनुहोस्।' },
];
