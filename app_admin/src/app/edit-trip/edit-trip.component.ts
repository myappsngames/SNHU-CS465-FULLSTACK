import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { AddTripComponent } from '../add-trip/add-trip.component';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})

export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  isEdit = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit() : void {
    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
  }

  console.log('EditTripComponent::ngOnInit');
  console.log('tripcode:' + tripCode);

  this.editForm = this.formBuilder.group({
    _id: [],
    code: [tripCode, Validators.required],
    name: ['', Validators.required],
    length: ['', Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
  });

  // Retrieve the most recent trip data from the database
  this.tripService.getTrip(this.editForm.value)
    .then((data) => {
      if (data) {
        this.editForm.patchValue(data);
      } else {
        console.error('No trip found');
      }
  })
  .catch(error => {
    console.error('Error retrieving trip data', error);
  });
}

public onSubmit() {
  this.submitted = true;
  if (this.editForm.valid) {
    this.tripService.updateTrip(this.editForm.value).then((data) => {
      this.router.navigate(['']);
    });
  }
}

  get f() { return this.editForm.controls; }
}
