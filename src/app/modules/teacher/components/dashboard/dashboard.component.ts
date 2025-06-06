import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GlobalService } from 'src/app/services/global.service';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
    constructor(public global: GlobalService,
        private httpService: HttpService,
        private sanitizer: DomSanitizer
    ) { }
    menuOpen = false;
    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
    selectedFile: File | null = null;
    selectedFileName: string = '';
    loading: boolean = false;
    rocCurveImage: SafeUrl | null = null; // To store the ROC curve image
    accuracyPlotImage: SafeUrl | null = null; // To store the accuracy plot image
    confusion_matrix_rf_image: SafeUrl | null = null; // To store the accuracy plot image
    confusion_matrix_xgb_image: SafeUrl | null = null; // To store the accuracy plot image
    showDefaultImages: boolean = true; // Flag to toggle between default and backend images
    currentImage: string = "";
    response: any;
    parsedReport: any[] = [];
    parsedReport2: any[] = [];
    // Trigger file input click
    triggerFileInput(): void {
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        fileInput.click();
    }

    // Handle file selection
    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (fileExtension !== 'csv') {
                alert('Please select a valid .csv file.');
                input.value = ''; // Clear the input
                this.selectedFileName = '';
                this.selectedFile = null;
                return;
            }
            this.selectedFile = file;
            this.selectedFileName = file.name;
        }
    }

    // Handle file submission
    async submitFile(): Promise<void> {
        if (!this.selectedFile) {
            alert('No file selected. Please upload a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFileName);
        this.loading = true;
        try {
            const response: any = await this.httpService.post(environment.apiUrl + 'api/upload/', formData);
            let responseToPass = response;
            console.log('File uploaded successfully:', response);
            alert('File uploaded successfully!');
            this.parsedReport = this.parseReport(response.report_rf_str);
            this.parsedReport2 = this.parseReport(response.report_xgb_str);


            // Extract and sanitize the base64 images from the response
            if (response.roc_curve_image) {
                this.rocCurveImage = this.sanitizer.bypassSecurityTrustUrl(`${response.roc_curve_image}`);
            }
            if (response.accuracy_plot_image) {
                this.accuracyPlotImage = this.sanitizer.bypassSecurityTrustUrl(`${response.accuracy_plot_image}`);
            }
            if (response.confusion_matrix_rf_image) {
                this.confusion_matrix_rf_image = this.sanitizer.bypassSecurityTrustUrl(`${response.confusion_matrix_rf_image}`);
            }
            if (response.confusion_matrix_xgb_image) {
                this.confusion_matrix_xgb_image = this.sanitizer.bypassSecurityTrustUrl(`${response.confusion_matrix_xgb_image}`);
            }

            responseToPass.roc_curve_image = response.roc_curve_image.replace(/^data:image\/png;base64,/, '');
            responseToPass.accuracy_plot_image = response.accuracy_plot_image.replace(/^data:image\/png;base64,/, '');
            responseToPass.confusion_matrix_rf_image = response.confusion_matrix_rf_image.replace(/^data:image\/png;base64,/, '');
            responseToPass.confusion_matrix_xgb_image = response.confusion_matrix_xgb_image.replace(/^data:image\/png;base64,/, '');
            this.response = responseToPass;
            // Hide default images and show backend images
            this.showDefaultImages = false;

            this.clearFile(); // Clear the file after successful upload
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file. Please try again.');
        } finally {
            this.loading = false;
        }
    }   

    parseReport(report: string): any[] {
    const lines = report.trim().split('\n');
    const parsed: any[] = [];

    for (let line of lines) {
      if (line.trim().startsWith('accuracy')) break;

      const parts = line.trim().split(/\s+/);
      if (parts.length >= 5) {
        const label = parts.slice(0, parts.length - 4).join(' ');
        const [precision, recall, f1, support] = parts.slice(-4);
        parsed.push({ label, precision, recall, f1, support });
      }
    }

    return parsed;
  }


    handleDownloadClick() {
        console.log("Download file working");
        this.httpService.post(environment.apiUrl + 'api/generate-pdf/', this.response).then((res:any)=>{
                const fileUrl = environment.apiUrl + res.pdf_url;
                window.open(fileUrl)
        });
    }

    // Clear selected file
    clearFile(): void {
        this.selectedFile = null;
        this.selectedFileName = '';
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }

    ngOnInit() {
        return;
    }

    ngAfterViewInit() {
        this.initTemperatureChart();
        this.initUsageByDaysChart();
        this.initUsageByDeviceChart();
    }

    setCurrentImage(imageBase64: any) {
        this.currentImage = imageBase64.changingThisBreaksApplicationSecurity;
        console.log("Open modal working", this.currentImage);
        this.displayModal = true;
    }

    displayModal: boolean = false;
    line1: string = '';
    line2: string = '';
    line3: string = '';

    showModal() {
        this.displayModal = true;
    }

    closeModal() {
        this.displayModal = false;
    }

    save() {
        // Implement save logic here
        console.log('Saving:', {
            line1: this.line1,
            line2: this.line2,
            line3: this.line3
        });
        this.closeModal();
    }

    private initTemperatureChart() {
        const ctx = document.getElementById('temperatureChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    '07:00',
                    '07:15',
                    '07:30',
                    '07:45',
                    '08:00',
                    '08:15',
                    '08:30',
                    '08:45',
                    '09:00',
                    '09:15',
                    '09:30',
                ],
                datasets: [
                    {
                        label: 'Normal Temperature',
                        data: [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30],
                        borderColor: '#2196f3',
                        tension: 0.4,
                        borderWidth: 2,
                        fill: false,
                    },
                    {
                        label: 'Current Temperature',
                        data: [-25, -18, -12, -8, -2, 3, 8, 12, 18, 22, 28],
                        borderColor: '#666',
                        tension: 0.4,
                        borderWidth: 2,
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f0f0f0',
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                },
            },
        });
    }

    private initUsageByDaysChart() {
        const ctx = document.getElementById('usageByDaysChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [
                    {
                        data: [30, 16, 13, 10, 9, 8, 7],
                        backgroundColor: ['#3f51b5', '#5c6bc0', '#7986cb', '#9fa8da', '#c5cae9', '#e8eaf6', '#f5f5f5'],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                        },
                    },
                },
            },
        });
    }

    private initUsageByDeviceChart() {
        const ctx = document.getElementById('usageByDeviceChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'Heating System',
                    'Air Conditioning',
                    'Microwave',
                    'Parking System',
                    'Cooler',
                    'Cameras',
                    'Refrigerator',
                ],
                datasets: [
                    {
                        data: [30, 16, 13, 10, 9, 8, 7],
                        backgroundColor: '#3f51b5',
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                        },
                    },
                },
            },
        });
    }
}
