import { Box, Center, Icon, Text, useColorMode } from '@chakra-ui/react';
import {
  Astronaut,
  ConnectModalContent,
  ConnectModalContentType,
  ConnectWalletButton,
  CopyAddressButton,
  DownloadInfo,
  InstallWalletButton,
  LogoStatus,
  WalletStatus
} from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { Story } from '@storybook/react';
import Bowser from 'bowser';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiDownload } from 'react-icons/hi';

import { handleDevice, WalletIcons } from '../../util/config';

interface TypeWithStatus extends ConnectModalContentType {
  walletStatus: WalletStatus;
}

function handleContentStatus(status: WalletStatus) {
  switch (status) {
    case WalletStatus.Disconnected:
      return {
        logo: WalletIcons.keplr,
        logoStatus: LogoStatus.Warning,
        contentHeader: 'Wallet is Disconnected',
        contentDesc: undefined,
        buttonText: 'Connect Wallet'
      };
    case WalletStatus.NotExist:
      return {
        logo: WalletIcons.keplr,
        logoStatus: LogoStatus.Error,
        contentHeader: 'Wallet Not Installed',
        contentDesc: 'Please install wallet',
        buttonText: 'Install Wallet'
      };
    case WalletStatus.Connecting:
      return {
        logo: WalletIcons.keplr,
        logoStatus: LogoStatus.Loading,
        contentHeader: 'Connecting Wallet',
        contentDesc: 'Open browser extension/app to connect your wallet.',
        buttonText: undefined
      };
    case WalletStatus.Connected:
      return {
        logo: Astronaut,
        logoStatus: undefined,
        contentHeader: undefined,
        contentDesc: undefined,
        buttonText: 'Disconnected'
      };
    case WalletStatus.Rejected:
      return {
        logo: WalletIcons.keplr,
        logoStatus: LogoStatus.Error,
        contentHeader: 'Request Rejected',
        contentDesc: 'Connection permission is denied.',
        buttonText: 'Reconnect'
      };
    case WalletStatus.Error:
      return {
        logo: WalletIcons.keplr,
        logoStatus: LogoStatus.Error,
        contentHeader: 'Oops! Something wrong...',
        contentDesc:
          'Seems something went wrong :(\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque repellat exercitationem, obcaecati, ipsa deleniti iure consequuntur excepturi optio quas nihil perferendis suscipit pariatur nulla amet beatae itaque unde fuga! Laboriosam, veniam? Beatae, rem rerum perspiciatis placeat obcaecati earum itaque laboriosam fugiat et ipsa praesentium non repellendus officia dolore quos ullam sint voluptates eligendi debitis magnam? Voluptas quis error, facere aspernatur velit suscipit cumque voluptate excepturi accusantium cum architecto rem, totam harum minus odio voluptatum illo veritatis voluptates nulla repellat culpa! At repellendus nemo harum, vitae enim autem natus quaerat possimus, eum, mollitia neque dolore accusantium! Officiis repellat itaque quae qui.',
        buttonText: 'Change Wallet'
      };

    default:
      return {
        logo: undefined,
        logoStatus: undefined,
        contentHeader: undefined,
        contentDesc: undefined,
        buttonText: 'Connect Wallet'
      };
  }
}

// eslint-disable-next-line react/prop-types
const Template: Story<TypeWithStatus> = ({ walletStatus }) => {
  const [userBrowserInfo, setUserBrowserInfo] = useState<
    DownloadInfo | string | undefined
  >();
  const contentInfo = handleContentStatus(walletStatus);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const info = {
      browser: browser.getBrowserName(true),
      device: browser.getPlatformType(true),
      os: browser.getOSName(true)
    };

    setUserBrowserInfo(handleDevice(info));
  }, []);

  return (
    <Center py={16}>
      <Box
        w="full"
        maxW={80}
        minH={60}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
      >
        <Box w="full" p={6} pb={3}>
          <Text textAlign="center">I&apos;m fake header</Text>
        </Box>
        <ConnectModalContent
          logo={contentInfo.logo}
          status={contentInfo.logoStatus}
          contentHeader={contentInfo.contentHeader}
          contentDesc={contentInfo.contentDesc}
          username={
            walletStatus === WalletStatus.Connected
              ? 'Rex Barkshire'
              : undefined
          }
          walletIcon={
            walletStatus === WalletStatus.Connected
              ? WalletIcons.keplr
              : undefined
          }
          addressButton={
            walletStatus === WalletStatus.Connected ? (
              <Box px={1}>
                <CopyAddressButton address="MediBlocLCpH" />
              </Box>
            ) : undefined
          }
          bottomButton={
            walletStatus ===
            WalletStatus.Connecting ? undefined : walletStatus ===
              WalletStatus.NotExist ? (
              <InstallWalletButton
                leftIcon={
                  <Icon
                    as={
                      typeof userBrowserInfo === 'string'
                        ? HiDownload
                        : userBrowserInfo?.icon
                    }
                  />
                }
                buttonText="Installed Keplr"
                // eslint-disable-next-line no-alert
                onClick={() => alert(`open wallet extension or app`)}
                disabled={false}
              />
            ) : (
              <ConnectWalletButton buttonText={contentInfo.buttonText} />
            )
          }
          bottomLink={
            walletStatus === WalletStatus.Disconnected ? (
              <NextLink href="/" target="_blank">
                Don&apos;t have a wallet?
              </NextLink>
            ) : undefined
          }
        />
      </Box>
    </Center>
  );
};

export const connectModalContent = Template.bind({});

// to hide controls
connectModalContent.parameters = {
  controls: {
    include: ['walletStatus']
  }
};

export default {
  title: 'Components/Modals/ConnectModal',
  component: ConnectModalContent,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Connect Modal Content
          </Text>
          <Primary />
          <ArgsTable of={ConnectModalContent} />
        </>
      ),
      source: {
        code: `import { ConnectModalContent } from '@cosmology-ui/react';\n\n<ConnectModalContent\n  logo="logo link"\n  status="status or undefined"\n  username="user"\n  walletIcon="wallet icon link"\n  contentHeader="la la la"\n  contentDesc="bla bla bla"\n  addressButton={<CopyAddressButton />}\n  bottomButton={<ConnectWalletButton />}\n  bottomLink={<Link />}\n  className="the class name of connect modal content"\n  styleProps={objectOfCustomConnectModalContentStyle}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  argTypes: {
    walletStatus: {
      options: Object.values(WalletStatus),
      defaultValue: WalletStatus.Disconnected,
      control: { type: 'radio' }
    }
  }
};
