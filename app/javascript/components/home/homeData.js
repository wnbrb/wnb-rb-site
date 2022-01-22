import React from 'react';
import JoinOurWelcomingCommunitySection from './JoinOurWelcomingCommunitySection';
import ExceedYourProfessionalGoalsSection from './ExceedYourProfessionalGoalsSection';
import GiveSupportSection from './GiveSupportSection';
import JoinCommunityIcon from 'components/icons/JoinCommunity';
import ExceedGoalsIcon from 'components/icons/ExceedGoals';
import GiveSupportIcon from 'components/icons/GiveSupport';

export const infoCardData = [
    {
        title: 'Join our welcoming community',
        section: <JoinOurWelcomingCommunitySection />,
        icon: JoinCommunityIcon,
    },
    {
        title: 'Exceed your professional goals',
        section: <ExceedYourProfessionalGoalsSection />,
        icon: ExceedGoalsIcon,
    },
    {
        title: 'Give support, and get it in return',
        section: <GiveSupportSection />,
        icon: GiveSupportIcon,
    },
];
