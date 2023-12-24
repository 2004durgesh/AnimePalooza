import Toast, { ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
};

const ToastMessage = ({ type, text1, text2 }) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'bottom',
    bottomOffset: 65,
  });

  return (
    <Toast />
  );
};

export { ToastMessage, toastConfig };
