export const convertImageToBase64 = (imgUrl: string): Promise<string>  =>  {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // To handle CORS issues if the image is from another domain

        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                // Get the data-URL formatted image
                const dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            } else {
                reject(new Error('Canvas context is null'));
            }
        };

        img.onerror = function(error) {
            // reject(new Error(`Image load error: ${error.message}`));
        };

        img.src = imgUrl;
    });
}
