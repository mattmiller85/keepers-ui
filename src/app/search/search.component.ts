import {
  Component,
  OnInit
} from '@angular/core';
import { KeepersWSService } from '../keepers-ws/keepers-ws.service';
import { SearchRequestMessage } from '../../../../keepers-server/src/core/messages';

@Component({
  selector: 'search',
  styleUrls: [ './search.component.css' ],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  public searchString: string = '';

  constructor(private client: KeepersWSService) { }

  public ngOnInit() {
    console.log('hello `Search` component');
  }

  public search() {
    this.client.searchDocuments(new SearchRequestMessage({ searchString: this.searchString }));
  }
}
