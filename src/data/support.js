// Donation and supporter information.

export const donationInfo = {
  bankNameEn: 'RASTRIYA BANIJYA BANK',
  bankNameNp: 'राष्ट्रिय वाणिज्य बैंक',
  accountNameEn: 'ADHIKAR SAMATA RA SHANTI ABHIYAN NEPAL',
  accountNameNp: 'अधिकार समता र शान्ति अभियान नेपाल',
  accountNo: '2222170021793442',
  branchEn: 'Thapathali, Kathmandu',
  branchNp: 'थापाथली, काठमाडौं',
  qrImage: '/QR/rbb-fonepay.jpeg',
  qrAltEn: 'REPC-Nepal donation QR code for Fonepay / supported banking apps.',
  qrAltNp: 'Fonepay तथा समर्थित बैंकिङ एपमार्फत सहयोग गर्न REPC-नेपालको QR कोड।',
  waysToGive: [
    {icon: 'qrcode', titleEn: 'Fonepay Qr Scan', titleNp: 'QR मार्फत सहयोग', descEn: 'Scan the fonepay Qr for direct deposit to our organization bank account.', descNp: 'संस्थाको Fonepay QR स्क्यान गरी सहयोग रकम जम्मा गर्नुहोस्।' },
    { icon: 'bank', titleEn: 'Bank Transfer', titleNp: 'बैंकमार्फत रकम जम्मा', descEn: 'Direct deposit to our organizational bank account (details below).', descNp: 'तल उल्लेखित संस्थागत बैंक खातामा सिधै सहयोग रकम जम्मा गर्नुहोस्।' },
    { icon: 'member', titleEn: 'Become a Member', titleNp: 'सदस्य बन्नुहोस्', descEn: 'Support our work year-round with an annual membership contribution.', descNp: 'सदस्यता प्राप्त गरी संस्थाको उद्देश्य तथा कार्यक्रमलाई निरन्तर सहयोग पुर्‍याउनुहोस्।' },
    { icon: 'partner', titleEn: 'In-Kind & Partnership', titleNp: 'वस्तुगत सहयोग तथा साझेदारी', descEn: 'Offer equipment, venue space, or a program partnership instead of cash.', descNp: 'उपकरण, कार्यक्रमस्थल वा कार्यक्रमगत साझेदारीमार्फत वस्तुगत तथा अन्य सहयोग पुर्‍याउनुहोस्।' },
  ],
};

export const suggestedDonations = [500, 1000, 2500, 5000];

export const donationUses = [
  {
    icon: 'legal',
    titleEn: 'Program delivery',
    titleNp: 'कार्यक्रम तथा सेवा सञ्चालन',
    bodyEn: 'Support for legal-awareness, consultation, mediation, training and community activities.',
    bodyNp: 'कानुनी सचेतना, परामर्श, मेलमिलाप, तालिम तथा समुदायस्तरीय कार्यक्रम सञ्चालनमा सहयोग।',
  },
  {
    icon: 'outreach',
    titleEn: 'Community outreach',
    titleNp: 'समुदायसम्म पहुँच विस्तार',
    bodyEn: 'Resources that help the organization reach people, document needs and coordinate appropriate support.',
    bodyNp: 'समुदायसम्म पहुँच विस्तार, आवश्यकता पहिचान, अभिलेखीकरण तथा उपयुक्त सहयोग समन्वयका लागि आवश्यक स्रोत।',
  },
  {
    icon: 'capacity',
    titleEn: 'Organizational capacity',
    titleNp: 'संस्थागत क्षमता सुदृढीकरण',
    bodyEn: 'Core capacity needed to sustain responsible nonprofit work, documentation and public accountability.',
    bodyNp: 'जिम्मेवार गैरनाफामूलक कार्य, अभिलेखीकरण तथा सार्वजनिक जवाफदेहितालाई सुदृढ बनाउन आवश्यक संस्थागत क्षमता।',
  },
];

export const donationSteps = [
  { no: '01', titleEn: 'Choose an amount', titleNp: 'सहयोग रकम छनोट गर्नुहोस्', bodyEn: 'Pick a suggested contribution or give another amount that fits your capacity.', bodyNp: 'दिइएका रकममध्ये उपयुक्त रकम छनोट गर्नुहोस् वा आफ्नो क्षमताअनुसार अन्य रकम सहयोग गर्नुहोस्।' },
  { no: '02', titleEn: 'Transfer the contribution', titleNp: 'सहयोग रकम जम्मा गर्नुहोस्', bodyEn: 'Scan the QR or transfer directly to the organizational bank account shown below.', bodyNp: 'QR स्क्यान गर्नुहोस् वा तल उल्लेखित संस्थागत बैंक खातामा सिधै सहयोग रकम जम्मा गर्नुहोस्।' },
  { no: '03', titleEn: 'Send the receipt', titleNp: 'भुक्तानीको प्रमाण पठाउनुहोस्', bodyEn: 'Send the payment receipt by WhatsApp or email so the organization can acknowledge and record the contribution.', bodyNp: 'सहयोग रकम जम्मा गरेको प्रमाण WhatsApp वा इमेलमार्फत पठाउनुहोस्, ताकि संस्थाले योगदानको उचित अभिलेख राख्न सकोस्।' },
];
