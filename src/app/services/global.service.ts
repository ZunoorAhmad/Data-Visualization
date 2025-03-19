import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe, Location } from '@angular/common';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    classId: any = '';
    dailySession: number = 30;
    weeklySession: number = 8;
    monthlySession: number = 12;
    annualSession: number = 6;
    everyWeekMF: number = 30;
    custom: number = 10;
    trackSubscription: Subject<any> = new Subject<any>();
    canvas: Subject<any> = new Subject<any>();
    token = '';
    currenciesWithCodes: { label: string; value: string; phoneCode: string; pattern: RegExp; symbol: string }[] = [
        { label: 'US Dollar (USD)', value: 'USD', phoneCode: '+1', pattern: /^\+1\d{10}$/, symbol: '$' },
        { label: 'Euro (EUR)', value: 'EUR', phoneCode: '+49', pattern: /^\+49\d{10}$/, symbol: '€' },
        { label: 'Japanese Yen (JPY)', value: 'JPY', phoneCode: '+81', pattern: /^\+81\d{9,10}$/, symbol: '¥' },
        { label: 'British Pound (GBP)', value: 'GBP', phoneCode: '+44', pattern: /^\+44\d{10}$/, symbol: '£' },
        { label: 'Indian Rupee (INR)', value: 'INR', phoneCode: '+91', pattern: /^\+91\d{10}$/, symbol: '₹' },
        { label: 'Australian Dollar (AUD)', value: 'AUD', phoneCode: '+61', pattern: /^\+61\d{9}$/, symbol: 'A$' },
        { label: 'Canadian Dollar (CAD)', value: 'CAD', phoneCode: '+1', pattern: /^\+1\d{10}$/, symbol: 'C$' },
        { label: 'Swiss Franc (CHF)', value: 'CHF', phoneCode: '+41', pattern: /^\+41\d{9}$/, symbol: 'CHF' },
        { label: 'Singapore Dollar (SGD)', value: 'SGD', phoneCode: '+65', pattern: /^\+65\d{8}$/, symbol: 'S$' },
        { label: 'Mexican Peso (MXN)', value: 'MXN', phoneCode: '+52', pattern: /^\+52\d{10}$/, symbol: 'MX$' },
        // { label: 'Pakistani Ruppee (PKR)', value: 'Rs', phoneCode: '+92', pattern: /^\+92\d{10}$/, symbol: 'PKR' },
    ];
    roomName = 'my-room';
    numberOfParticipantsAllowed = 10;
    shareScreenTrack: Subject<any> = new Subject<any>();
    dominantSpeakerChange: Subject<any> = new Subject<any>();
    remoteParticipantsUpdated: Subject<any> = new Subject<any>();
    onParticipantsConnected: Subject<any> = new Subject<any>();
    backgroundEffectChanged: Subject<any> = new Subject<any>();
    isScreenShare: Subject<boolean> = new Subject<boolean>();
    isRecordStarted: Subject<boolean> = new Subject<boolean>();
    videoAction: Subject<boolean> = new Subject<boolean>();
    isLogout: Subject<boolean> = new Subject<boolean>();
    published: Subject<boolean> = new Subject<boolean>();
    isClassSetup: Subject<boolean> = new Subject<boolean>();
    isLoading: Subject<boolean> = new Subject<boolean>();
    responseUpdate: Subject<boolean> = new Subject<boolean>();
    stopShareScreenTrack: Subject<boolean> = new Subject<any>();
    userVideoOn: Subject<boolean> = new Subject<any>();
    tabIndexChange: Subject<boolean> = new Subject<any>();
    messageArray: any = [];
    authToken: string;
    role = { email: '', isTeacher: false };
    getMessage: Subject<any> = new Subject<any>();
    stuAnsQuizes: any[] = [];
    quizCome: Subject<any> = new Subject<any>(); // will set when quiz has arrived to the students
    ansCome: Subject<any> = new Subject<any>(); // will set when quiz has arrived to the students
    // stuSolvedQuiz:Subject<any> = new Subject<any>(); // will set when student teh quiz and submit
    meetingTime: any; // will tell how ling the meeting has been started
    isAnnouncementAdded: boolean;
    isClassCreated: boolean;
    userId: string = '';
    rejectLabel: string = 'No';
    acceptLabel: string = 'Yes';
    days: any[] = [
        { label: 'Sunday', value: 7 },
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 },
    ];
    timeZones: string[] = momentTimezone.tz.names();
    classInfo: any = {
        className: '',
        classTopic: '',
    };
    user: any;
    constructor(
        private router: Router,
        private location: Location,
        private httpService: HttpService,
        private dialogRef: DynamicDialogRef,
        public dialogService: DialogService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        if (window['Cypress']) {
            window['GlobalService'] = 'test';
        }
    }

    openDialog(component, data = {}, header = '', width = '', styleClass = 'alert-msg') {
        const ref = this.dialogService.open(component, {
            data: data,
            header: header,
            width: width != '' ? width : '40vw',
            styleClass: styleClass,
            showHeader: header ? true : false,
            dismissableMask: true, // Enable backdrop dismiss
        });
        return new Promise((resolve, reject) => {
            ref.onClose.subscribe((data: any) => {
                if (data) {
                    resolve(data);
                } else {
                    reject(false);
                }
            });
        });
    }

    convetTimeToTimezone(time, timezone) {
        let laptopTimezone = moment.tz.guess();
        // return moment(time, 'YYYY-MM-DD HH:mm:ss')
        //     .tz(timezone)
        //     // .tz(laptopTimezone) // Convert to the laptop timezone
        //     .format('YYYY-MM-DD HH:mm:ss');
        // Interpret the given date and time as being in the source time zone
        // const momentInGivenTimeZone = moment.tz(time, timezone);
        // Convert to Moment object in the target time zone (laptop's time zone)
        // const momentInLaptopTimeZone = momentInGivenTimeZone.clone().tz(laptopTimezone);
        // Format the result
        // const formattedDateTime = momentInLaptopTimeZone.format('YYYY-MM-DD HH:mm:ss');
        return moment.tz(time, 'YYYY-MM-DD HH:mm:ss', timezone).tz(laptopTimezone).format('YYYY-MM-DD HH:mm:ss');
        // return formattedDateTime;
        //return moment.tz(time, timezone).tz(laptopTimezone).format('YYYY-MM-DD HH:mm:ss')
        // return moment.tz(time, timezone).clone().tz(laptopTimezone).format('YYYY-MM-DD HH:mm:ss')
    }

    closeDialog() {
        this.dialogRef.close('dsasddsa');
    }

    getEnumKey(variable, value) {
        return Object.keys(variable)[Object.values(variable).indexOf(value)];
    }

    /**
     * @returns a unique id for each record to store in db
     */
    generateUniqueId(): string {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getCurrencySymbol(currency: string): string {
        const currencyObject = this.currenciesWithCodes.find(c => c.value === currency);
        return currencyObject ? currencyObject.symbol : currency;
    }

    formatDateToLocal(inputDate: string, inputTime: string, inputTimeZone: string) {
        const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const dateTimeString = `${inputDate}T${inputTime}`;
        const momentObj = moment.tz(dateTimeString, inputTimeZone);
        const convertedMoment = momentObj.clone().tz(browserTimeZone);
        const formattedDate = convertedMoment.format('MMM D, YYYY ,ddd');
        return formattedDate;
    }

    formatDate(inputDate) {
        const date = new Date(inputDate);
        const options: any = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    }

    formatToAMPM(dateString: string): string {
        // return formattedTime;
        const localTimestamp = moment.utc(dateString).local();

        // Format in AM/PM without the date
        return localTimestamp.format('hh:mm A');
    }
    isOccurance(value: any) {
        if (!value.split) {
            return true;
        }

        if (value.split('-').map(Number).length > 0) {
            return false;
        }
        return true;
    }

    getDayOfWeek(inputDate) {
        const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        const date = new Date(inputDate);
        const dayOfWeekIndex = date.getDay();
        return daysOfWeek[dayOfWeekIndex];
    }

    async confirmDialogue(header, message, rejectLabel = 'No', acceptLabel = 'Yes') {
        return new Promise((resolve, reject) => {
            this.rejectLabel = rejectLabel;
            this.acceptLabel = acceptLabel;
            this.confirmationService.confirm({
                message: message,
                header: header,
                rejectLabel: rejectLabel,
                acceptLabel: acceptLabel,
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    resolve('Accepted');
                },
                reject: type => {
                    switch (type) {
                        case ConfirmEventType.REJECT:
                            reject('Rejected');
                            break;
                        case ConfirmEventType.CANCEL:
                            reject('Cancelled');
                            break;
                    }
                },
            });
        });
    }

    alertDialog(header: string, message: string) {
        return new Promise(resolve => {
            this.confirmationService.confirm({
                message: message,
                header: header,
                icon: 'pi pi-info-circle',
                acceptLabel: 'Ok',
                acceptButtonStyleClass: '',
                rejectVisible: false,
                accept: () => {
                    resolve(true);
                },
            });
        });
    }

    getTimeToDateFormat(time) {
        const timeString = time;
        const currentDate = new Date(); // Get the current date
        const fullDateTimeString = `${currentDate.toISOString().slice(0, 10)}T${timeString}`;
        return new Date(fullDateTimeString);
    }

    validateImage(file: File, width, height, size) {
        // Check dimensions
        const img = new Image();
        img.src = URL.createObjectURL(file);

        return new Promise<boolean>(resolve => {
            img.onload = () => {
                if (img.width !== width || img.height !== height) {
                    this.openSnackBar(`Image dimensions must be ${width}x${height}.`, 'error');
                    resolve(false);
                } else {
                    resolve(true);
                }
            };
            // Check size
            if (file.size > size * 1024 * 1024) {
                this.openSnackBar('Image size must be less than 1MB.', 'error');
                resolve(false);
            }
        });
    }

    validateVideo(file: File, maxWidth: number, maxHeight: number, maxSizeInMB: number): Promise<boolean> {
        const isVideo = file.type.startsWith('video/');
        if (!isVideo) {
            this.openSnackBar('Invalid file type. Please upload a video.', 'error');
            return Promise.resolve(false);
        }
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        return new Promise<boolean>(resolve => {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.addEventListener('loadedmetadata', () => {
                const isValidDimensions = video.videoWidth === maxWidth && video.videoHeight === maxHeight;
                const isValidSize = file.size <= maxSizeInBytes;
                if (!isValidDimensions) {
                    this.openSnackBar(`Video dimensions must be ${maxWidth}x${maxHeight}.`, 'error');
                }
                if (!isValidSize) {
                    this.openSnackBar(`Video size must be less than ${maxSizeInMB}MB.`, 'error');
                }
                resolve(isValidDimensions && isValidSize);
            });
            video.onerror = () => {
                this.openSnackBar('Error loading video file.', 'error');
                resolve(false);
            };
            // Check size
            if (file.size > maxSizeInBytes) {
                this.openSnackBar(`Video size must be less than ${maxSizeInMB}MB.`, 'error');
                resolve(false);
            }
        });
    }

    logout() {
        this.goToPage('auth/login');
        this.clearStorage();
        this.userId = '';
        this.user = {};
    }

    /**
     * will convert the image to b64
     * @param file file to convert in b64
     * @param callback callback
     */
    convertImageToBase64(file: File, callback: (base64String: string) => void) {
        try {
            const reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result as string);
            };
            reader.readAsDataURL(file);
        } catch (err) {
            // this.openDialog(ErrorDialogComponent, { text: err.message });
        }
    }
    viewportToPixels(value) {
        //eslint-disable-next-line
        const parts = value.match(/([0-9\.]+)(vh|vw)/);
        const q = Number(parts[1]);
        const side = window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]];
        return side * (q / 100);
    }

    goBack() {
        this.location.back();
    }

    openSnackBar(text: string, severity = 'success') {
        this.messageService.add({ severity: severity, summary: severity, detail: text });
    }

    setObservable(variable: string, value: any): void {
        this[variable].next(value);
    }

    getObservable(variable: string): Subject<any> {
        return this[variable];
    }

    setStorage(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getStorage(key: string) {
        let storage = localStorage.getItem(key);
        if (storage) {
            storage = JSON.parse(storage);
        }
        return storage;
    }

    clearStorage() {
        localStorage.clear();
    }

    goToPage(page: string, arg = {}) {
        this.router.navigate([page, arg]);
    }

    randomString(length = 20): string {
        let result = '';
        const characters = 'ABCDEFG5425324HIJKWXYZa125123bcdefgLMNOPQRSTUVhijklmn23opqrstuvwxyz01456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    //will return the current time of meeting
    getMeetingTime(roomSid) {
        const storedTime: any = this.getStorage('currentTime');
        if (storedTime && storedTime.roomId == roomSid) {
            const time = new Date();
            const storedTimeObj = new Date(storedTime.time);
            const timeDifference = time.getTime() - storedTimeObj.getTime();
            return Math.floor(timeDifference / 1000); // Convert milliseconds to seconds
        } else {
            const currentTime = new Date();
            const timeString: any = currentTime.toISOString();
            const timeObj: any = { time: timeString, roomId: roomSid };
            this.setStorage('currentTime', timeObj);
            return 1;
        }
    }

    getParams(arg, variable, comparedVaribale?) {
        let params = '';
        for (let c = 0; c < variable.length; c++) {
            if (comparedVaribale) {
                params += `${arg}=${variable[c][comparedVaribale]}`;
            } else {
                params += `${arg}=${variable[c].id}`;
            }
            if (c < variable.length - 1) {
                params += '&';
            }
        }
        return params;
    }

    getBrowserTimeZone(): string {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    formatDateTimeZone(inputDate: string, inputTime: string, inputTimeZone: string) {
        const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const dateTimeString = `${inputDate}T${inputTime}`;
        const momentObj = moment.tz(dateTimeString, inputTimeZone);
        const convertedMoment = momentObj.clone().tz(browserTimeZone);
        const formattedDate = convertedMoment.format('MMM D, YYYY ,ddd');
        return formattedDate;
    }

    getComaSeperatedParams(arg, variable, comparedVaribale?) {
        let params = '';
        for (let c = 0; c < variable.length; c++) {
            if (c == 0 && comparedVaribale) {
                params += `${arg}=${variable[c][comparedVaribale]}`;
            } else if (c == 0) {
                params += `${arg}=${variable[c].id}`;
            } else {
                params += `,${variable[c].id}`;
            }

            // if (c < variable.length - 1) {
            //     params += '&';
            // }
        }
        return params;
    }

    convertToUserLocalTime(date, timeZone, time) {
        if (!date || !timeZone || !time) return '';
        let sessionTime = moment.tz(`${date}T${time}`, timeZone);
        let userLocalTime = sessionTime.clone().local();
        return this.convrtTimeToAmPm(userLocalTime.format('HH:mm:ss'));
    }

    convrtTimeToAmPm(time) {
        const yourTimeString = time;
        const dummyDate = '2000-01-01 ' + yourTimeString; // Use any valid date here
        const yourDate = new Date(dummyDate);
        return new DatePipe('en-US').transform(yourDate, 'shortTime');
    }

    public getCurrentDateAndTime(inputDate?): string {
        const date = inputDate ? new Date(inputDate) : new Date();
        const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
        const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
        const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
        const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        const year = date.getFullYear() > 9 ? date.getFullYear() : '0' + date.getFullYear();
        return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
    }
}
