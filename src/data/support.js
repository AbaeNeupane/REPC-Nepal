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
    {icon: 'qrcode', titleEn: 'Fonepay Qr Scan', titleNp: 'Qr Scan', descEn: 'Scan the fonepay Qr for direct deposit to our organization bank account.', descNp: 'हाम्रो संस्थागत fonepay Qr मा प्रत्यक्ष जम्मा गर्नुहोस्' },
    { icon: 'bank', titleEn: 'Bank Transfer', titleNp: 'बैंक स्थानान्तरण', descEn: 'Direct deposit to our organizational bank account (details below).', descNp: 'हाम्रो संस्थागत बैंक खातामा प्रत्यक्ष जम्मा गर्नुहोस् (विवरण तल)।' },
    { icon: 'member', titleEn: 'Become a Member', titleNp: 'सदस्य बन्नुहोस्', descEn: 'Support our work year-round with an annual membership contribution.', descNp: 'वार्षिक सदस्यता योगदानद्वारा वर्षभरि हाम्रो कामलाई सहयोग गर्नुहोस्।' },
    { icon: 'partner', titleEn: 'In-Kind & Partnership', titleNp: 'वस्तुगत सहयोग तथा साझेदारी', descEn: 'Offer equipment, venue space, or a program partnership instead of cash.', descNp: 'नगदको सट्टा उपकरण, स्थान, वा कार्यक्रम साझेदारी प्रदान गर्नुहोस्।' },
  ],
};

export const suggestedDonations = [500, 1000, 2500, 5000];

export const donationUses = [
  {
    icon: 'legal',
    titleEn: 'Program delivery',
    titleNp: 'कार्यक्रम सञ्चालन',
    bodyEn: 'Support for legal-awareness, consultation, mediation, training and community activities.',
    bodyNp: 'कानुनी सचेतना, परामर्श, मेलमिलाप, तालिम तथा समुदायस्तरीय गतिविधिका लागि सहयोग।',
  },
  {
    icon: 'outreach',
    titleEn: 'Community outreach',
    titleNp: 'समुदायसम्म पहुँच',
    bodyEn: 'Resources that help the organization reach people, document needs and coordinate appropriate support.',
    bodyNp: 'समुदायसम्म पुग्न, आवश्यकताहरू अभिलेख गर्न र उपयुक्त सहयोग समन्वय गर्न आवश्यक स्रोत।',
  },
  {
    icon: 'capacity',
    titleEn: 'Organizational capacity',
    titleNp: 'संस्थागत क्षमता',
    bodyEn: 'Core capacity needed to sustain responsible nonprofit work, documentation and public accountability.',
    bodyNp: 'जिम्मेवार गैरनाफामूलक काम, अभिलेखीकरण र सार्वजनिक जवाफदेहितालाई निरन्तरता दिन आवश्यक संस्थागत क्षमता।',
  },
];

export const donationSteps = [
  { no: '01', titleEn: 'Choose an amount', titleNp: 'रकम छान्नुहोस्', bodyEn: 'Pick a suggested contribution or give another amount that fits your capacity.', bodyNp: 'दिइएका रकममध्ये छान्नुहोस् वा आफ्नो क्षमताअनुसार अर्को रकम सहयोग गर्नुहोस्।' },
  { no: '02', titleEn: 'Transfer the contribution', titleNp: 'रकम पठाउनुहोस्', bodyEn: 'Scan the QR or transfer directly to the organizational bank account shown below.', bodyNp: 'QR स्क्यान गर्नुहोस् वा तल दिइएको संस्थागत बैंक खातामा सिधै रकम पठाउनुहोस्।' },
  { no: '03', titleEn: 'Send the receipt', titleNp: 'रसीद पठाउनुहोस्', bodyEn: 'Send the payment receipt by WhatsApp or email so the organization can acknowledge and record the contribution.', bodyNp: 'सहयोगको रसीद WhatsApp वा इमेलमार्फत पठाउनुहोस् ताकि संस्था योगदानको अभिलेख राख्न र धन्यवाद दिन सकोस्।' },
];
