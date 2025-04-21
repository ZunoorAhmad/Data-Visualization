import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GlobalService } from 'src/app/services/global.service';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
    constructor(public global: GlobalService) { }

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    selectedFileName: string | null = null;

    triggerFileInput() {
        this.fileInput.nativeElement.click();
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFileName = input.files[0].name;
        }
    }

    clearFile() {
        this.selectedFileName = null;
        this.fileInput.nativeElement.value = ''; // Reset the input
    }

    ngOnInit() {
        return;
    }

    ngAfterViewInit() {
        this.initTemperatureChart();
        this.initUsageByDaysChart();
        this.initUsageByDeviceChart();
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
