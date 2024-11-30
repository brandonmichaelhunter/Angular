import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit
{
  /* main form  */
  rackServerForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.rackServerForm = this._fb.group({
      name: new FormControl<string>(''),
      request_type: new FormControl<string>(''),
      request_types: new FormControl<any[]>(this.getRequestTypes()),
      ticket_number: new FormControl<string>(this.generateRandomTicketNumber(10)),
      RackForm: this._fb.array([]),
    });
  }
  /* A method that generates a random ticket number */
  generateRandomTicketNumber(length: number = 10): string {
    const characters = '000000123456789';
    let ticketNumber = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      ticketNumber += characters.charAt(randomIndex);
    }

    return 'ATS-000'+ticketNumber;
  }



  ngOnInit() {}
  /// Returns an instance of the FormArray object for consumers.
  get RackForm() {
    return this.rackServerForm?.get('RackForm') as FormArray;
  }
  // Returns the number of rows currently in the FormArray object.
  get FormRowLength(): number {
    let formAry: FormArray = this.rackServerForm?.get('RackForm') as FormArray;
    let rowLength: number = 0;
    rowLength = formAry.controls.length;
    return rowLength;
  }
  // Returns an instance of the FormArray.Controls object.
  get RackFormControls() {
    return (this.rackServerForm?.get('RackForm') as FormArray).controls;
  }
  // Adds a new row to the FormArray object.
  addNewFormRow() {
    this.RackForm.push(this.initFormRow());
  }
  // Removes a row from the FormArray object
  removeFormRow(index: number) {
    this.RackForm.removeAt(index);
  }


  submitForm() {
    console.log(this.rackServerForm);
    alert('Form Saved !!!');
  }
  // Initalizes a FormGroup object to be added to the FormArray object.
  initFormRow() {
    const result: FormGroup = this._fb.group({
      serial_number: new FormControl<string>(''),
      asset_tag: new FormControl<string>(''),
      device_name: new FormControl<string>(''),
      cabinet: new FormControl<string>(''),
      cabinets: new FormControl<any[]>(this.getCabinets()),
      device_type: new FormControl<string>(''),
      device_types: new FormControl<any[]>(this.getDeviceType()),
      manufacture: new FormControl<number>(0),
      manufactures: new FormControl<any[]>(this.getManufactures()),
      model: new FormControl<number>(0),
      models: new FormControl<any[]>([]),
      rack_slot: new FormControl<number>(0),
    });

    return result;
  }

  OnDeviceTypeSelect(index: number) {
    // get the current row index number
    let rowIndex = Number(index) - 1;
    // get an instance of the form;
    let formInstance = this.RackForm;
    const rowFormInstance = formInstance.at(rowIndex);
    // get selected value
    let selectedTypeID = Number(rowFormInstance.value.device_type);
    let selectedVendorID = Number(rowFormInstance.value.manufacture);

    // clear the list
    let listLength = rowFormInstance?.value.models.length;
    rowFormInstance?.value.models.splice(0, listLength);

    // populate the FormArray list
    rowFormInstance?.value.models.push(
      this.getModels().filter(
        (a) => a.typeid == selectedTypeID && a.vendorid == selectedVendorID
      )
    );
  }

  /* Select lists.  */
  getRequestTypes() {
    return [{id:1, type:'Device Install'}, {id:2, type:'Device Removal'}];
  }
  getCabinets() {
    return [
      { id: '1', name: 'K1AA01' },
      { id: '2', name: 'K1AA02' },
      { id: '3', name: 'K1AA03' },
      { id: '4', name: 'K1AA04' },
      { id: '5', name: 'K1AA05' },
      { id: '6', name: 'K1AA06' },
      { id: '7', name: 'K1AA07' },
      { id: '8', name: 'K1AA08' },
      { id: '9', name: 'K1AA09' },
      { id: '10', name: 'K1AA10' },
    ];
  }
  getDeviceType() {
    return [
      { id: 1, type: 'Device' },
      { id: 2, type: 'Patch Panel' },
      { id: 3, type: 'PDU' },
    ];
  }
  getManufactures() {
    return [
      { id: 1, vendor: 'Dell' },
      { id: 2, vendor: 'Cisco' },
      { id: 3, vendor: 'Hewlett Packard' },
    ];
  }
  getModels() {
    return [
      { id: 1, name: 'PowerEdge T150 Tower Server', vendorid: 1, typeid: 1 },
      { id: 2, name: 'PowerEdge R250 Rack Server', vendorid: 1, typeid: 1 },
      { id: 3, name: 'PowerEdge T350 Tower Server', vendorid: 1, typeid: 1 },
      {
        id: 4,
        name: 'C2G 24-Port Blank Keystone/Multimedia Patch Panel',
        vendorid: 1,
        typeid: 2,
      },
      {
        id: 5,
        name: 'Tripp Lite by Eaton 24-Port 1U Rack-Mount Cat5e Feedthrough Patch Panel, RJ45 Ethernet, TAA',
        vendorid: 1,
        typeid: 2,
      },
      {
        id: 6,
        name: 'C2G Horizontal Cable Management Panel 2U 3.5in',
        vendorid: 1,
        typeid: 2,
      },
      { id: 7, name: 'APC Basic Rack 1.8kVA PDU', vendorid: 1, typeid: 3 },
      {
        id: 8,
        name: 'Rack PDU, Basic, 1U, 15A, 120V, (10)5-15',
        vendorid: 1,
        typeid: 3,
      },
      { id: 9, name: 'APC Basic Rack 3.68kVA PDU', vendorid: 1, typeid: 3 },

      {
        id: 10,
        name: 'Cisco UCS B200 M5 2 Bay Blade Server (UCSB-B200-M5)',
        vendorid: 2,
        typeid: 1,
      },
      {
        id: 11,
        name: 'Cisco UCS C220 M5 10 Bay 1U Rackmount Server',
        vendorid: 2,
        typeid: 1,
      },
      {
        id: 12,
        name: 'Cisco UCS C240 M5 24 Bay SFF 2U Rackmount Server',
        vendorid: 2,
        typeid: 1,
      },
      {
        id: 13,
        name: '2RU 8-Degree Mesh Patch Pan FD',
        vendorid: 2,
        typeid: 2,
      },
      {
        id: 14,
        name: 'P48 x 75 Ohm E3/DS3 Termination Thru HD',
        vendorid: 2,
        typeid: 2,
      },
      {
        id: 15,
        name: 'Ons 15216 48 Channel MUX/Demux Ex FD',
        vendorid: 2,
        typeid: 2,
      },
      {
        id: 16,
        name: 'RP208-30-U-1 Single Phase PDU 2x C13 4x C19',
        vendorid: 2,
        typeid: 3,
      },
      {
        id: 17,
        name: 'RP208-30-U-2 1-Phase PDU 20XC13 4XC19',
        vendorid: 2,
        typeid: 3,
      },
      {
        id: 18,
        name: 'PCisco Systems RP230-32-U-1 Single Phase PDU 2x C13 4x C19',
        vendorid: 2,
        typeid: 3,
      },

      {
        id: 19,
        name: 'HPE ProLiant DL380 G10 2U Rack Server - 1 x Xeon Silver 4208',
        vendorid: 3,
        typeid: 1,
      },
      { id: 20, name: 'HP ProLiant DL360p G8 Server', vendorid: 3, typeid: 1 },
      {
        id: 22,
        name: '48 Port Cat6 110 2RU Rack Mount Punch Down Patch Panel',
        vendorid: 3,
        typeid: 2,
      },
      {
        id: 23,
        name: 'HP PC Blade Tray RJ45 Patch Panel Board',
        vendorid: 3,
        typeid: 2,
      },

      { id: 25, name: 'HP G2 Basic 20-Outlet PDU', vendorid: 3, typeid: 3 },
      {
        id: 26,
        name: 'HP Power Monitor 1PH 40A Dual PDU',
        vendorid: 3,
        typeid: 3,
      },
    ];
  }

}
