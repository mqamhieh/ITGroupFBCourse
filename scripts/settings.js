/**
 * Created by Mohamed on 2/4/2017.
 */

(function () {
    var ctx;
    var isMoving, isResizing;

    var cropperWidth = 100;
    var cropperHeight = 100;

    var limitMaxLeft = 640;
    var limitMaxTop = 480;

    var limitMinLeft = 0;
    var limitMinTop = 0;

    var maxSize = 480;
    var minSize = 50;

    window.allowDrop = function (event) {
        event.preventDefault();
    };

    window.onDrop = function (event) {
        var file = event.dataTransfer.files[0];

        if (file && file.type.indexOf("image/") == 0) {

            $(".drop_here").hide();

            var fr = new FileReader();
            fr.onload = function () {
                var fileContent = fr.result;
                var img = new Image();

                if (!ctx) {
                    canvas = document.getElementById("imageCanvas");
                    ctx = canvas.getContext("2d");
                }

                img.onload = function () {
                    var canvasH = canvas.height;
                    var canvasW = canvas.width;
                    var imageH = img.height;
                    var imageW = img.width;

                    var ratioX = imageW / canvasW;
                    var ratioY = imageH / canvasH;

                    var ratio = (ratioX > ratioY)? ratioX: ratioY;

                    if (ratio < 1) {
                        ratio = 1;
                    }

                    var newImageH = imageH / ratio;
                    var newImageW = imageW / ratio;

                    var offsetX = (canvasW - newImageW) / 2;
                    var offsetY = (canvasH - newImageH) / 2;

                    limitMinLeft = offsetX;
                    limitMinTop = offsetY;

                    limitMaxLeft = offsetX + newImageW;
                    limitMaxTop = offsetY + newImageH;

                    maxSize = newImageW < newImageH? newImageW: newImageH;

                    $(".cropper").css("left", limitMinLeft);
                    $(".cropper").css("top", limitMinTop);

                    ctx.drawImage(img, offsetX, offsetY, newImageW, newImageH);
                };

                img.src = fileContent;
            };

            fr.onerror = function () {
                alert("Something went wrong");
            };

            fr.readAsDataURL(file);
        }
        event.preventDefault();
    };

    $(document).ready(function () {

        var startY = $(".image_cropper").offset().top;
        var startX = $(".image_cropper").offset().left;

        $(window).on("resize", function () {
            startY = $(".image_cropper").offset().top;
            startX = $(".image_cropper").offset().left;
        });

        var mouseStartX, mouseStartY;

        $(".cropper .corner").on("mousedown", function (event) {
            isResizing = true;
            mouseStartX = event.pageX;
            mouseStartY = event.pageY;
            event.stopPropagation();
        });

        $(".cropper").on("mousedown", function (event) {
            isMoving = true;
        });

        $("body").on("mouseup", function (event) {
            isMoving = false;
            isResizing = false;
        });

        $("body").on("mousemove", function (event) {
            if (isResizing) {
                var widthDiff = event.pageX - mouseStartX;
                var heightDiff = event.pageY - mouseStartY;

                var newWidth = cropperWidth + widthDiff;
                var newHeight = cropperHeight + heightDiff;

                var newSize = Math.abs(widthDiff) > Math.abs(heightDiff)? newWidth: newHeight;

                if (newSize < minSize) {
                    newSize = minSize;
                }

                if (newSize > maxSize) {
                    newSize = maxSize;
                }

                cropperWidth = newSize;
                cropperHeight = newSize;

                $(".cropper").css("width", cropperWidth);
                $(".cropper").css("height", cropperHeight);

                mouseStartX = event.pageX;
                mouseStartY = event.pageY;
            }
            else if (isMoving) {
                var offsetX = (event.pageX - startX) - (cropperWidth / 2);
                var offsetY = (event.pageY - startY) - (cropperHeight / 2);


                var newLeft = offsetX;
                var newTop = offsetY;

                if (offsetX < limitMinLeft) {
                    newLeft = limitMinLeft;
                }
                else if (offsetX > (limitMaxLeft - cropperWidth)) {
                    newLeft = (limitMaxLeft - cropperWidth);
                }

                if (offsetY < limitMinTop) {
                    newTop = limitMinTop;
                }
                else if (offsetY > (limitMaxTop - cropperHeight)) {
                    newTop = (limitMaxTop - cropperHeight);
                }

                $(".cropper").css("left", newLeft);
                $(".cropper").css("top", newTop);
            }
        });
    });
})();
