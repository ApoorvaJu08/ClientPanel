import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',  
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean = this.settingsService.getSettings().disableBalanceOnEdit;
  constructor(private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService) { }

    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.clientService.getClient(this.id).subscribe(client => {
        this.client = client;
      });
    }

    onSubmit({value, valid}: {value: Client, valid: boolean}) {
      if(!valid) {
        this.flashMessage.show('Please fill out the form correctly', {
          cssClass: 'alert-danger', timeout: 4000
        });
      } else {
        // Add id to client
        value.id = this.id;
        // Update client
        this.clientService.updateClient(value);
        this.flashMessage.show('Client updated', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/client/'+this.id]);
      }
    }

}
