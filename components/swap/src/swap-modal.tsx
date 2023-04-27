import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { useTheme } from '@cosmology-ui/theme';
import React from 'react';

import { SwapView } from './swap-view';
import { SwapModalType } from './type';

export const SwapModalBaseStyle = (theme: string) => {
  return {
    bg: `swap-modal-background-color-${theme}`,
    color: `swap-modal-text-color-${theme}`,
    borderRadius: 'xl',
    p: 6,
    '>.swap-modal-header': {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: 0,
      pb: 5,
      '>.swap-modal-title': {
        fontSize: 'xl',
        fontWeight: 'semibold',
        lineHeight: 'none'
      },
      '>.swap-modal-close': {
        top: -1.5,
        right: -1.5,
        p: 2.5,
        w: 'fit-content',
        h: 'fit-content'
      }
    }
  };
};

export const SwapModal = ({
  isOpen,
  loading,
  fromToken,
  toToken,
  inputData,
  dropdownData,
  tokenPrice,
  swapDetails,
  slippageConfig,
  submitButtonConfig,
  onAmountInputChange,
  onFromDropdownChange,
  onToDropdownChange,
  onSwapSwitch,
  onSwapSubmit,
  onClose
}: SwapModalType) => {
  const { theme } = useTheme();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="swap-modal" sx={SwapModalBaseStyle(theme)}>
        <ModalHeader className="swap-modal-header">
          <Text className="swap-modal-title">Swap</Text>
          <ModalCloseButton className="swap-modal-close" variant="unstyled" />
        </ModalHeader>

        <SwapView
          loading={loading}
          fromToken={fromToken}
          toToken={toToken}
          dropdownData={dropdownData}
          inputData={inputData}
          tokenPrice={tokenPrice}
          swapDetails={swapDetails}
          slippageConfig={slippageConfig}
          submitButtonConfig={submitButtonConfig}
          onFromDropdownChange={onFromDropdownChange}
          onToDropdownChange={onToDropdownChange}
          onAmountInputChange={onAmountInputChange}
          onSwapSwitch={onSwapSwitch}
          onSwapSubmit={onSwapSubmit}
        />
      </ModalContent>
    </Modal>
  );
};
