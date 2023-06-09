import { Component } from '@angular/core';
import { Photo } from 'app/dto/Photo';
import { SocialMediaService } from 'app/social-media.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tag-images.component.html',
  styleUrls: ['./tag-images.component.css'],
})
export class TagsComponent {
  photos: Photo[] = [];

  constructor(private socialMediaService: SocialMediaService) {}

  ngOnInit(): void {
    // this.getImages();
  }

  tag: string = 'test tag';
}
