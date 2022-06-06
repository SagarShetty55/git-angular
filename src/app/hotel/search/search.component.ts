import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder) { }
  public searchText: any;
  public searchForm: FormGroup | any;

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchText: ['', [Validators.required, Validators.minLength(3)]]
    })
  }
  get fc() { return this.searchForm.controls; }

  onSubmit() {
    this.router.navigate(['/hotel-lists/'], { queryParams: { searchValue: JSON.stringify(this.searchForm.value.searchText)} });
    // localStorage.setItem("searchText", searchData)
    // this.router.navigate(['/hotel-lists/'])
    // this.router.navigate(['/hotel-lists/'+ searchData])
  }
}
