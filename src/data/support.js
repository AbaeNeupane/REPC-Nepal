// Donation and supporter information.
// Bank details, QR code and ways to give live in support.json, which the /admin panel edits.

import supportData from './support.json';

export const donationInfo = { ...supportData.donationInfo, waysToGive: supportData.donationInfo.waysToGive || [] };

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
