import click
import requests
import urllib
import os

# the requests module
def getAlbum(id):
  req = requests.get('http://localhost:8000/api/cli/albums/' + id)
  return req

def getResource(id): 
  req = requests.get('http://localhost:8000/api/cli/resources/' + id)
  return req

def searchAlbum(name):
  req = requests.post('http://localhost:8000/api/cli/albums/', data={"name": name})
  return req

def dwn(loc, name):
  url = "http://localhost:8000/image/" + loc
  urllib.urlretrieve(url, name)

# the cli commands
@click.group()
def cli():
  pass

@cli.command()
@click.argument('id')
@click.option('--info', '-n', help="Show album info", is_flag=True)
@click.option('--download', '-d', help="Download all resources from this album", is_flag=True)
@click.option('--resources', '-r', help="Show resources", is_flag=True)
@click.option('--user', '-u', help="Show user info", is_flag=True)
def album(id, info, download, resources, user):
  album = getAlbum(id)
  if album.status_code == 200:
    album = album.json()['album']
    if info:
      click.echo('Album \'' + album['name'] + '\':')
      click.echo('- color: ' + album['color'])
      click.echo('- public: ' + str((album['public'] == 1) and 'true' or 'false'))
      click.echo('- controls: ' + str((album['controls'] == 1) and 'true' or 'false'))
      click.echo('- autoplay: ' + str((album['autoplay'] == 1) and 'true' or 'false'))
      click.echo('- resources: ' + str(len(album['resources'])))
      if user:
        click.echo('- user: ' + album['user']['name'])
      if resources:
        for res in album['resources']:
          click.echo('  - ' + res['name'] + '.' + res['type'])
          click.echo('    - id: ' + str(res['uuid']))
          click.echo('    - name: ' + str(res['name']))
          click.echo('    - type: ' + str(res['type']))
          click.echo('    - transition: ' + str(res['transition']))
          click.echo('    - loop: ' + str((res['loop'] == 1) and 'true' or 'false'))
          click.echo('    - mute: ' + str((res['mute'] == 1) and 'true' or 'false'))
    if download:
      os.mkdir(album["name"])
      for res in album['resources']:
        dwn(res['location'], album["name"] + '/' + str(res['name'] + '.' + res['type']))
        click.echo('Downloaded ' + str(res['name'] + '.' + res['type']))
      click.echo("Successfull downloaded in " + album["name"] + " directory " + album["name"])
  else:
    click.echo('The album was not found')


@cli.command()
@click.argument('id')
@click.option('--info', '-n', help="Show resource info", is_flag=True)
@click.option('--album', '-a', help="Show album info too", is_flag=True)
@click.option('--download', '-d', help="Download the resource", is_flag=True)
def resource(id, info, album, download):
  res = getResource(id)
  if res.status_code == 200:
    alb = res.json()['resource']['album']
    res = res.json()['resource']
    if info:
      click.echo('Resource \'' + res['name'] + '.' + res['type'] + '\':')
      click.echo('- id: ' + str(res['uuid']))
      click.echo('- name: ' + str(res['name']))
      click.echo('- type: ' + str(res['type']))
      click.echo('- transition: ' + str(res['transition']))
      click.echo('- loop: ' + str((res['loop'] == 1) and 'true' or 'false'))
      click.echo('- mute: ' + str((res['mute'] == 1) and 'true' or 'false'))
    if album:
      click.echo('Album \'' + alb['name'] + '\':')
      click.echo('- color: ' + alb['color'])
      click.echo('- public: ' + str((alb['public'] == 1) and 'true' or 'false'))
      click.echo('- controls: ' + str((alb['controls'] == 1) and 'true' or 'false'))
      click.echo('- autoplay: ' + str((alb['autoplay'] == 1) and 'true' or 'false'))
    if download:
      click.echo('Downloading ' + res['name'])
      dwn(res['location'], str(res['name'] + '.' + res['type']))
      click.echo('Successfully downloaded as ' + str(res['name'] + '.' + res['type']))
  else: 
    click.echo('The resource was not found')


@cli.command()
@click.argument('name')
def search(name): 
  res = searchAlbum(name)
  if res.status_code == 200:
    albums = res.json()['albums']
    click.echo('Found ' + str(len(albums)) + ' albums: ')
    for alb in albums:
      click.echo('- ' + alb['uuid'] + ' ( ' + alb['name'] + ' ) by ' + alb['user']['name'])
  else: 
    click.echo('An error occured')


if __name__ == "__main__":
  cli()