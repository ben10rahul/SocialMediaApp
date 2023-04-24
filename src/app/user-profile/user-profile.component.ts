import { Component } from '@angular/core';
import { Album } from 'app/dto/Album';
import { SocialMediaService } from 'app/social-media.service';
import { Photo } from 'app/dto/Photo';
import { User } from 'app/dto/User';
import { CookieService } from 'ngx-cookie-service';
import * as uuid from 'uuid';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  albums: Album[] = [];
  username: string = "";
  firstPhotos: Photo[] = [];
  recommendedFriends: string[] = [];

  addAlbumClicked: boolean = false;
  newAlbum = new Album('','','','');

  constructor(private socialMediaService: SocialMediaService,
              private cookie: CookieService,
              private router: Router,
              private route: ActivatedRoute) {
                this.route.paramMap.subscribe(params=> {
                  this.ngOnInit();
                });
              }

  ngOnInit(): void {
    this.getUsername();
    this.getAlbums();
    this.getRecommendedFriends();
  }

  ngOnChanges() {
    this.getAlbums();
  }

  addAlbumClick(): void {
    this.addAlbumClicked = !this.addAlbumClicked;
  }

  onSubmit() {
    this.newAlbum.album_id = uuid.v4().toString();
    this.newAlbum.creation_date = new Date().toISOString();
    this.newAlbum.user_id = this.username;
    this.socialMediaService.createAlbum(this.newAlbum);
    this.getAlbums();
    this.albums.forEach(album => {
      console.log(album.name)
    });
    this.addAlbumClicked=false;
    this.newAlbum=new Album('','','','');
    
    //window.location.reload();
    //this.getAlbums();
    //this.router.navigate(['/profile']);
    
}

  getAlbums(): void {
    this.socialMediaService.getAlbums(this.username).then(albums=>this.albums=albums);
  }

  getUsername(): void {
    this.username = this.cookie.get("user_id")
  }

  getFirstPhotos(): void {
    //this.socialMediaService.getFirstPhotos()
    // .subscribe(firstPhotos => this.firstPhotos = firstPhotos);
  }

  getRecommendedFriends(): void {
    this.socialMediaService.getFriendRecommendations(this.cookie.get('user_id')).then(res => {
        this.recommendedFriends = res;
    })
  }
}

