import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    ReportsService
} from '@core/http';
import * as FileSaver from 'file-saver';
import {
    PropReport,
    Prop
} from '@core/models/listing';
import {
    ErrorResponse
} from '@core/models/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@core/helpers';

@Component({
    selector: 'app-reports-page',
    templateUrl: './reports-page.component.html',
    styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {

    reportsPageForm: FormGroup;

    @ViewChild('reportDateRangecalendar') reportDateRangecalendar: any;


    today: Date;

    basicData: any;
    basicOptions: any;

    activeListings: any[];
    pendingListings: any[];

    cols: any[];
    totalRecords: number;
    exportColumns: any[];

    data: any;
    pieData: any[];

    confirmShowing: any[];
    requestedShowing: any[];
    cancelShowing: any[];

    data1: any;
    pieData1: any[];

    constructor(
      private formBuilder: FormBuilder,
      private reportsService: ReportsService) {}




    ngOnInit(): void {
      this.initializeForm();

      /////////////// DATE PICKER ////////////////////
      //this.today = new Date();
      /////////////// LISTING REPORT /////////////////
      // TODO: startDate and endDate
      this.generateReports(formatDate(new Date()), formatDate(new Date()));
    }

    private generateReports(startDate: string, endDate: string): void {
      console.log('startDate : ' + startDate);
      console.log('endDate : ' + endDate);
      this.reportsService.getListingData(startDate, endDate).subscribe(
            (res) => {
                this.activeListings = res.activeProperties;
                this.pendingListings = res.pendingProperties;
                //create listing report pie chart
                this.pieData = [res.activeProperties.length, res.pendingProperties.length];
                this.data = {
                    labels: ['Active', 'Pending'],
                    datasets: [{
                        data: this.pieData,
                        backgroundColor: [
                            "#42A5F5",
                            "#66BB6A"
                        ],
                        hoverBackgroundColor: [
                            "#64B5F6",
                            "#81C784"
                        ]
                    }]
                };
            },
            (err: ErrorResponse) => {
                console.log(err);
            },
            () => {
                console.log('success');
            }
        );

        this.cols = [{
                field: 'mlsNumber',
                header: 'MLS Number'
            },
            {
                field: 'price',
                header: 'Price'
            },
            {
                field: 'propertyType',
                header: 'Property Type'
            },
            {
                field: 'fullAddress',
                header: 'Full Address'
            }

        ];

        this.exportColumns = this.cols.map(col => ({
            title: col.header,
            dataKey: col.field
        }));

        /////////////// LISTING REPORT /////////////////


        /////////////// SHOWING REPORT ///////////////
        // confirmShowing: any[];
        // requestedShowing: any[];
        // cancelShowing: any[];
        this.reportsService.getShowingData(startDate, endDate).subscribe(
              (res) => {
                  this.confirmShowing = res.confirmShowing;
                  this.requestedShowing = res.requestedShowing;
                  this.cancelShowing = res.cancelShowing;
                  //create listing report pie chart
                  this.pieData1 = [res.requestedShowing.length, res.confirmShowing.length, this.cancelShowing.length];
                  this.data1 = {
                      labels: ['Requested', 'Confirmed', 'Cancelled'],
                      datasets: [{
                          data: this.pieData1,
                          backgroundColor: [
                              "#42A5F5",
                              "#66BB6A",
                              "#FFA726"
                          ],
                          hoverBackgroundColor: [
                              "#64B5F6",
                              "#81C784",
                              "#FFB74D"
                            ]
                      }]
                  };
              },
              (err: ErrorResponse) => {
                  console.log(err);
              },
              () => {
                  console.log('success');
              }
          );

          // showing market

          this.reportsService.getShowingTotal().subscribe(
                (res) => {
                    console.log(res);
                    //create listing report pie chart
                    //[0, 0, 0, 0, 0, 0, 0,0 ,0 ,0 ,0 ,0]
                  this.basicData = {
                      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                      datasets: [
                          {
                              label: 'Total Showings',
                              backgroundColor: '#42A5F5',
                              data: res.totalShowings
                          },
                          {
                              label: 'Your Showings',
                              backgroundColor: '#FFA726',
                              data: res.yourShowings
                          }
                      ]
                  };
                  this.basicOptions = {
                      plugins: {
                          legend: {
                              labels: {
                                  color: '#ebedef'
                              }
                          }
                      },
                      scales: {
                          x: {
                              ticks: {
                                  color: '#ebedef'
                              },
                              grid: {
                                  color: 'rgba(255,255,255,0.2)'
                              }
                          },
                          y: {
                              ticks: {
                                  color: '#ebedef'
                              },
                              grid: {
                                  color: 'rgba(255,255,255,0.2)'
                              }
                          }
                      }
                  };
                },
                (err: ErrorResponse) => {
                    console.log(err);
                },
                () => {
                    console.log('success');
                }
            );
    }

    onDateRangeSelect() {
      const dateRange = this.reportsPageForm.controls['dateRange'].value;

      if (dateRange && dateRange[1])  {
        this.reportDateRangecalendar.hideOverlay();
        const startDate =  formatDate(dateRange[0])
        const endDate = formatDate(dateRange[1])
        // AFUENTES - here's the date range
        console.log("startDate= "+ startDate + ",endDate= " +endDate);
        console.log(this.reportDateRangecalendar);
        this.generateReports(startDate, endDate);
      }
    }

    private initializeForm() {
      this.reportsPageForm = this.formBuilder.group({
        dateRange: [[new Date, new Date], [Validators.required]],
      });
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.activeListings);
            const workbook = {
                Sheets: {
                    'data': worksheet
                },
                SheetNames: ['data']
            };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
            this.saveAsExcelFile(excelBuffer, "download");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        //FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }

        //   exportPdf() {
        //     import("jspdf").then(jsPDF => {
        //         import("jspdf-autotable").then(x => {
        //             const doc = new jsPDF.default(0,0);
        //             doc.autoTable(this.exportColumns, this.activeListings);
        //             doc.save('products.pdf');
        //         })
        //     })
        // }
}
