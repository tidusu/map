    // retina适配 获取逻辑像素 物理像素 比
    function getPixelRatio(context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    };

    function fixImageOrientation(file) {
        return new Promise((resolve, reject) => {
            // 获取图片
            const img = new Image();
            img.src = window.URL.createObjectURL(file);
            img.onerror = () => resolve(file);
            img.onload = () => {
                // 获取图片元数据（EXIF 变量是引入的 exif-js 库暴露的全局变量）
                EXIF.getData(img, function () {
                    // 获取图片旋转标志位
                    var orientation = EXIF.getTag(this, "Orientation");
                    // 根据旋转角度，在画布上对图片进行旋转
                    if (orientation === 3 || orientation === 6 || orientation === 8) {
                        const canvas2 = document.createElement("canvas");
                        const ctx2 = canvas2.getContext("2d");
                        switch (orientation) {
                            case 3: // 旋转180°
                                canvas2.width = img.width;
                                canvas2.height = img.height;
                                ctx2.rotate((180 * Math.PI) / 180);
                                ctx2.drawImage(img, -img.width, -img.height, img.width, img.height);
                                break;
                            case 6: // 旋转90°
                                canvas2.width = img.height;
                                canvas2.height = img.width;
                                ctx2.rotate((90 * Math.PI) / 180);
                                ctx2.drawImage(img, 0, -img.height, img.width, img.height);
                                break;
                            case 8: // 旋转-90°
                                canvas2.width = img.height;
                                canvas2.height = img.width;
                                ctx2.rotate((-90 * Math.PI) / 180);
                                ctx2.drawImage(img, -img.width, 0, img.width, img.height);
                                break;
                        }
                        // 返回新图片
                        canvas2.toBlob(file => resolve(file), 'image/jpeg', 0.92)
                        // canvas2.toDataURL(file => resolve(file), 'image/jpeg', 0.92)
                    } else {
                        return resolve(file);
                    }
                });
            };
        });
    }


    function draw(canvas_json) {

        // let canvas = document.body.appendChild(document.createElement('canvas'));
        let canvas = document.getElementById('canvas_holder').appendChild(document.createElement('canvas'));
        let canvas_t = document.getElementById('canvas_holder').appendChild(document.createElement('canvas'));
        let btn = document.getElementById('btn');

        let ctx = canvas.getContext('2d');
        let ctx_t = canvas_t.getContext('2d');

        // 高清
        let retina_ratio = getPixelRatio(ctx);

        // let [w,h] = [600,800];
        let sytle_w = document.documentElement.clientWidth * 0.8;
        let sytle_h = sytle_w / 3 * 4;
        let w = sytle_w * retina_ratio;
        let h = sytle_h * retina_ratio;

        canvas.width = w;
        canvas.height = h;
        canvas.style.width = sytle_w + 'px';
        canvas.style.height = sytle_h + 'px';

        canvas_t.width = w;
        canvas_t.height = h;
        canvas_t.style.width = sytle_w + 'px';
        canvas_t.style.height = sytle_h + 'px';

        console.log(sytle_w, w, canvas.width, canvas.style.width)

        let clayers = canvas_json.layers //画面元素层
        let ww = canvas_json.width //画布中的宽度

        let cinput = `<input type="file" name="file" id="file-5" class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple /><label for="file-5"><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg></figure> <span>拍摄或照片</span></label>`
        btn.insertAdjacentHTML('beforeend', cinput);

        var input = document.getElementById("file-5");
        //检测浏览器是否支持FileReader
        if (typeof (FileReader) === 'undefined') {
            result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
            input.setAttribute('disabled', 'disabled');
        } else {
            //开启监听
            input.addEventListener('change', readFile, false);
        }

        drawDefalt()

        // 缩放因子
        function factor(data) {
            return data * w / ww
        }

        function drawLayer(layers) {
            layers.forEach(function (layer, i) {

                let cid = layer.name
                let ctype = layer.type
                console.log(cid, ctype)

                if (ctype == 'text') {
                    // 解析字体
                    font_size = factor(layer.style.fontSize)
                    font_color = layer.style.color.hex
                    font_align = layer.style.alignment
                    font_x = factor(layer.frame.x)
                    font_y = factor(layer.frame.y)
                    font_w = factor(layer.frame.width)
                    font_h = factor(layer.frame.height)
                    console.log(`x:${font_x},y:${font_y},w:${font_w},h:${font_h},size:${font_size},color:${font_color},align:${font_align}`)

                    // 文字框
                    ctx_t.fillStyle = "rgba(255, 255, 0, 0.2)"
                    ctx_t.fillRect(font_x, font_y, font_w, font_h)

                    // 文字
                    ctx_t.font = `bold ${font_size}px sans-serif`;
                    if (font_align == 0){
                        ctx_t.textAlign = "end";
                        font_x = font_x + font_w
                    }else if (font_align == 1){
                        ctx_t.textAlign = "center";
                        font_x = font_w / 2
                    }else{
                        ctx_t.textAlign = "start";
                    }
                    // ctx_t.textAlign = "start";
                    // ctx_t.textAlign = "center";
                    ctx_t.textBaseline = "top";
                    ctx_t.fillStyle = font_color;

                    
                    ctx_t.fillText(cid, font_x, font_y);

                }
                if (cid == 'front') {

                    var img = new Image();   // 创建一个<img>元素
                    img.onload = function () {
                        ctx.drawImage(img, 0, 0, w, h);
                    }
                    img.src = layer.attr.src
                }
                if (layer.name == 'watermark') {

                }
            });
        }

        function readFile() {
            var file = this.files[0];

            // 图片方向角
            var Orientation = null;

            if (file) {
                var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式

                if (!rFilter.test(file.type)) {
                    alert("请选择jpeg、png格式的图片");
                    return;
                }

                var file2 = fixImageOrientation(file)
                console.log({ file })

                file2.then(function (value) {
                    console.log({ value });
                    //转换成base64
                    const reader = new FileReader();
                    reader.readAsDataURL(value);
                    reader.onload = function (e) {
                        var img = new Image();   // 创建一个<img>元素
                        img.onload = function () {

                            this_width = this.width
                            this_height = this.height

                            // alert(this_width + this_height);
                            console.log(`图片尺寸：${this_width} ${this_height}`);

                            let [input_w, input_h] = [this.width, this.height]
                            if (input_w / input_h > 3 / 4) {
                                cw = input_h / h * w
                                ch = input_h
                                cx = (input_w - cw) / 2
                                cy = 0

                            } else {
                                cw = input_w
                                ch = input_w / w * h
                                cx = 0
                                cy = (input_h - ch) / 2
                            }
                            ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h)
                            drawLayer(clayers)
                        }
                        img.src = reader.result;
                    };

                });
            }
        }

        function drawDefalt(){
            var img = new Image();   // 创建一个<img>元素
            img.onload = function () {

                this_width = this.width
                this_height = this.height

                // alert(this_width + this_height);
                console.log(`图片尺寸：${this_width} ${this_height}`);

                let [input_w, input_h] = [this.width, this.height]
                if (input_w / input_h > 3 / 4) {
                    cw = input_h / h * w
                    ch = input_h
                    cx = (input_w - cw) / 2
                    cy = 0

                } else {
                    cw = input_w
                    ch = input_w / w * h
                    cx = 0
                    cy = (input_h - ch) / 2
                }
                ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h)
                drawLayer(clayers)
            }
            img.src = 'a2.jpg';
        }
    }
