import { Component, Inject } from "@angular/core";
import { Name, NAMETOKEN } from "../shared/models/Name";

@Component({
  selector: "my-about",
  templateUrl: "./about.component.html",
})
export class AboutComponent {
  value: string = "";
  value2: String = "";
  constructor(
    @Inject("NAME_TOKEN") NameTokn: Name,
    @Inject(NAMETOKEN) value: String
  ) {
    this.value = NameTokn.myName;
    this.value2 = value;
  }

  public team: { name: string; email: string }[] = [
    {
      name: "Robert Hernandez",
      email: "rh@edu.org",
    },
    {
      name: "Samantha Jones",
      email: "sam@jones.com",
    },
    {
      name: "Michael Jordan",
      email: "michael@jordon.net",
    },
  ];
}
