import umami from '@umami/node';

umami.init({
    websiteId: '3d99b5cb-1f96-4d40-a583-008fba6c52ae', // Your website id
    hostUrl: 'https://cloud.umami.is', // URL to your Umami instance
});

export const umamiTrackCheckoutSuccessEvent = async (payload: {
    [key: string]: string | number | Date
}) => {
    await umami.track('checkout_success', payload);
}