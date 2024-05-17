
export const resources = {
    cn: {
        translation: {
            login: {
                title1: "一個電話",
                title2: "三步落單",
                subtitle: "幫你收衫 洗衫 送衫 👍",
                mobile: "手機號碼",
                mbPlaceholder: "請輸入手機號碼",
                password: "密碼",
                pwPlaceholder: "請輸入密碼",
                register: "註冊",
                forget: "忘記密碼",
                login: "登入",
            },
            register: {
                title: "註冊用戶",
                subtitle1: "我們將以 ",
                subtitle2: "WhatsApp聯絡閣下號碼",
                segment1: "登入資料",
                segment2: "收發地址",
                mbRequired: "須提供手機號碼",
                mbLength: "須8位數香港號碼",
                mbPattern: "只接受手機號碼",
                mobile: "手機號碼",
                mbPlaceholder: "需要聯絡閣下收衫送衫",
                pwRequired: "須提供密碼",
                pwMinLength: "至少6字元",
                pwMaxLength: "上限16字元",
                pwPattern: "密碼須包括英文字母及數字",
                password: "密碼",
                pwPlaceholder: "請輸入密碼",
                cfpwRequired: "須確認密碼",
                cfpwValidate: "密碼不符",
                cfPassword: "確認密碼",
                cfpwPlaceholder: "請再次輸入密碼",
                emRequired: "須提供電郵",
                emPattern: "不符電郵格式",
                email: "電郵",
                emPlaceholder: "用作重設密碼",
                nameRequired: "請讓本店知道閣下稱呼",
                nameMinLength: "至少2字元",
                nameMaxLength: "上限16字元",
                name: "稱呼",
                namePlaceholder: "請問如何稱呼閣下？",
                distRequired: "須提供地區用作收衫送衫",
                distMinLength: "至少2字元",
                distMaxLength: "上限30字元",
                district: "地區",
                distPlaceholder: "收衫送衫地址",
                stRequired: "須提供街道名稱用作收衫送衫",
                stMinLength: "至少2字元",
                stMaxLength: "上限30字元",
                street: "街道",
                stPlaceholder: "用作收衫送衫地址",
                bdlgRequired: "須提供大廈名稱用作收衫送衫",
                bdlgMinLength: "至少2字元",
                bdlgMaxLength: "上限30字元",
                building: "大廈",
                bdlgPlaceholder: "用作收衫送衫地址",
                next: "下一步",
                register: "註冊",
            },
            auth: {
                error: "唔好意思...",
                errorText: "請稍後再試"
            },
            tabs: {
                laundry: "磅洗",
                dryClean: "乾洗",
                alteration: "改衣",
                others: "其他清洗",
            },
            drawer: {
                mobile: "更改註冊電話",
                address: "更改常用地址",
                delete: "刪除帳戶",
                logout: "登出",
            },
            modals: {
                orders: "現時訂單"
            },
            orderForm: {
                confirmOrder: "確認訂單",
                address: "填寫地址",
                district: "地區",
                distPlaceholder: "請填寫地區",
                street: "街道",
                stPlaceholder: "請填寫街道",
                building: "大廈",
                bdlgPlaceholder: "請填寫大廈名稱",
                pickup: "上門收衫時間",
                confirm: "確定",
                reset: "重設",
                cancel: "取消",
                locale: "zh",
                delivery: "送回衣服時間",
            },
            orderDialog: {
                confirmOrder: "請確認訂單",
                tel: "電話：",
                address: "地址：",
                pickup: "收衫時間：",
                delivery: "送衫時間：",
                pc: "衣服袋數",
                pcPlaceholder: "需要清洗幾袋衣服？",
                remarks: "備註（選填）",
                remarksPlaceholder: "有其他事項需要本店注意嗎？",
                send: "發送訂單",
                sending: "發送中",
                cancel: "取消",
            },
            orders: {
                pw: "磅洗",
                dc: "乾洗",
                cs: "改衣",
                fw: "洗家具",
                lw: "洗袋",
                ws: "洗鞋",
                number: "編號：",
                quantity: "數量：",
                status: "狀態：",
                w_pickup:"等待收衫",
                w_service:"已收衫",
                w_delivery:"等待派送",
                complete:"已完成",
                null:"需查找紀錄",
                address:"地址：",
                pickup:"預計收衫時間：",
                delivery:"預計送衫時間："
            },
            editMobile: {
                title: "更改註冊電話",
                subtitle1: "請確保你的新號碼能以",
                subtitle2: "通訊。",     
                number: "現時號碼",
                required: "須輸入新手機號碼",
                length: "須8位數香港號碼",
                pattern: "只接受手機號碼",
                label: "新手機號碼",
                placeholder: "請輸入新號碼",
                confirm: "確定更改",
                success: "成功更改號碼",
                error: "唔好意思...",
                errorText: "請稍後再試"
            },
            editAddress: {
                title: "更改常用地址",
                subtitle: "請提供準確地址以便本店收發衣服。",
                address: "現時地址",
                minLength: "至少2字元",
                maxLength: "上限30字元",
                distRequired: "須提供地區名稱用作收衫送衫",
                district: "地區",
                distPlaceholder: "請填寫地區",
                stRequired: "須提供街道名稱用作收衫送衫",
                street: "街道",
                stPlaceholder: "請填寫街道",
                bdlgRequired: "須提供大廈名稱用作收衫送衫",
                building: "大廈",
                bdlgPlaceholder: "請填寫大廈名稱",
                cancel: "取消",
                confirm: "確定更改",
                success: "成功更改地址",
                error: "唔好意思...",
                errorText: "請稍後再試"
            },
            deleteUser: {
                title: "刪除帳戶？請等等...",
                subtitle1: "請閣下再三考慮是否需要刪除此帳戶。一經刪除，你將",
                subtitle2:"無法恢復使用",
                subtitle3:"此號碼登入。",
                current: "刪除帳戶",
                required: "須輸入「 DELETE 」以確定刪除帳戶",
                label: "確定刪除帳戶",
                placeholder: "請輸入「 DELETE 」確定",
                delete: "刪除",
                success: "成功刪除帳戶",
                error: "唔好意思...",
                errorText: "請稍後再試"
            },
            editDialog: {
                mobile: "確定新號碼",
                address: "確定新地址",
                password: "確定新密碼",
                delete: "確定刪除帳戶？",
                mobileText: "你的註冊電話將改為：",
                addressText: "你的常用地址將改為：",
                passwordText: "你的密碼將改為：",
                deleteText: "希望您將來能體驗本店更好的服務。",
                cancel: "取消",
                confirm: "確定"
            }
        }
    },
    eng: {
        translation: {
            login: {
                title1: "Three steps",
                title2: "Zero hassle",
                subtitle: "Door-to-door laundry in one mobile 👍",
                mobile: "Mobile Number",
                mbPlaceholder: "Plese enter your number",
                password: "Password",
                pwPlaceholder: "Please enter your password",
                register: "Register",
                forget: "Forgot",
                login: "Login",
            },
            register: {
                title: "Registration",
                subtitle1: "We will contact you via ",
                subtitle2: " WhatsApp.",
                segment1: "Account",
                segment2: "Address",
                mbRequired: "Mobile number is required",
                mbLength: "Must be 8-digit Hong Kong number",
                mbPattern: "Only accept HK mobile numbers",
                mobile: "Mobile Number",
                mbPlaceholder: "Required for contact",
                pwRequired: "Password is required",
                pwMinLength: "Minimum 6 characters",
                pwMaxLength: "Maximum 16 characters",
                pwPattern: "Must include letters and numbers",
                password: "Password",
                pwPlaceholder: "Please enter password",
                cfpwRequired: "Please confirm your password",
                cfpwValidate: "Passwords do not match",
                cfPassword: "Confirm Password",
                cfpwPlaceholder: "Please re-enter password",
                emRequired: "Email is required",
                emPattern: "Invalid email format",
                email: "Email",
                emPlaceholder: "Used for password reset",
                nameRequired: "Please let us know how to call you",
                nameMinLength: "Minimum 2 characters",
                nameMaxLength: "Maximum 16 characters",
                name: "Name",
                namePlaceholder: "How should we address you?",
                distRequired: "Required for pickup and delivery",
                distMinLength: "Minimum 2 characters",
                distMaxLength: "Maximum 30 characters",
                district: "District",
                distPlaceholder: "Used for pickup and delivery",
                stRequired: "Required for pickup and delivery",
                stMinLength: "Minimum 2 characters",
                stMaxLength: "Maximum 30 characters",
                street: "Street",
                stPlaceholder: "Used for pickup and delivery",
                bdlgRequired: "Required for pickup and delivery",
                bdlgMinLength: "Minimum 2 characters",
                bdlgMaxLength: "Maximum 30 characters",
                building: "Building",
                bdlgPlaceholder: "Used for pickup and delivery",
                next: "Next",
                register: "Register",
            },            
            auth: {
                error: "Something went wrong",
                errorText: "Please try again later"
            },
            tabs: {
                laundry: "Laundry",
                dryClean: "Dry Clean",
                alteration: "Alteration",
                others: "Others",
            },
            drawer: {
                mobile: "Change Number",
                address: "Edit Address",
                delete: "Delete Account",
                logout: "Logout",
            },
            modals: {
                orders: "Current Orders"
            },
            orderForm: {
                confirmOrder: "Confirm My Order",
                address: "Your Address",
                district: "District",
                distPlaceholder: "Please enter your district",
                street: "Street",
                stPlaceholder: "Please enter in your street",
                building: "Building",
                bdlgPlaceholder: "Please enter in your building name",
                pickup: "Laundry Pickup",
                confirm: "Confirm",
                reset: "Reset",
                cancel: "Cancel",
                locale: "en",
                delivery: "Clothes Delivery",
            },
            orderDialog: {
                confirmOrder: "Confirm Your Order",
                tel: "Tel: ",
                address: "Address: ",
                pickup: "Pickup: ",
                delivery: "Delivery: ",
                pc: "Quantity (in bags)",
                pcPlaceholder: "How many bags of clothes to wash?",
                remarks: "Remarks (Optional)",
                remarksPlaceholder: "Anything else to take notice?",
                send: "Send",
                sending: "Sending",
                cancel: "Cancel",
            },
            orders: {
                pw: "Laundry",
                dc: "Dry Cleaning",
                cs: "Alteration",
                fw: "Home Textile Cleaning",
                lw: "Bag Cleaning",
                ws: "Shoe Cleaning",
                number: "Invoice Number: ",
                quantity: "Quantity: ",
                status: "Status: ",
                w_pickup:"Waiting for pickup",
                w_service:"Collected",
                w_delivery:"Waiting for delivery",
                complete:"Completed",
                null:"Checking",
                address:"Address: ",
                pickup:"Expected Pickup: ",
                delivery:"Expected Delivery: "
            },
            editMobile: {
                title: "Change Number",
                subtitle1: "Please ensure your new number has access to ",
                subtitle2: ".",     
                number: "Current Number",
                required: "New number is required",
                length: "8-digit HK number is required",
                pattern: "Only accept HK number",
                label: "New Mobile Number",
                placeholder: "Please enter your new mobile number",
                confirm: "Confirm Change",
                success: "Successfully changed number",
                error: "Something went wrong",
                errorText: "Please try again later"
            },
            editAddress: {
                title: "Edit Address",
                subtitle: "Please provide an accurate address for us to collect and deliver your clothes.",
                address: "Current Address",
                minLength: "At least 2 characters",
                maxLength: "Up to 30 characters",
                distRequired: "District is required for pickup and delivery",
                district: "District",
                distPlaceholder: "Please enter your district",
                stRequired: "Street is required for pickup and delivery",
                street: "Street",
                stPlaceholder: "Please enter your street",
                bdlgRequired: "Building name is required for pickup and delivery",
                building: "Building",
                bdlgPlaceholder: "Please enter your building name",
                cancel: "Cancel",
                confirm: "Confirm Change",
                success: "Successfully changed address",
                error: "Something went wrong",
                errorText: "Please try again later"
            },
            deleteUser: {
                title: "Deleting Your Account?",
                subtitle1: "Please consider carefully. Once deleted, you will ",
                subtitle2: "no longer ",
                subtitle3: "be able to use this number for our online service.",
                current: "Delete Account",
                required: 'DELETE must be entered to confirm',
                label: "Confirm Account Deletion",
                placeholder: 'Please enter DELETE to confirm',
                delete: "Delete Permanently",
                success: "Successfully deleted account",
                error: "Something went wrong",
                errorText: "Please try again later"
            },
            editDialog: {
                mobile: "Confirm New Number",
                address: "Confirm New Address",
                password: "Confirm New Password",
                delete: "Delete Your Account?",
                mobileText: "Your number will be changed to:",
                addressText: "Your address will be changed to:",
                passwordText: "Your password will be changed to:",
                deleteText: "We hope you will try our service again.",
                cancel: "Cancel",
                confirm: "Confirm"
            }
        }
    }
}