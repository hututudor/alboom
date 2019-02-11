import click
import requests

# the requests module
def getAlbum(id):
  req = requests.get('http://localhost:8000/api/cli/albums/' + id)
  return req

# the cli commands
@click.group()
def cli():
  pass

@cli.command()
@click.argument('id')
@click.option('--info', '-n', help="Show album info", is_flag=True)
def albums(id, info):
  album = getAlbum(id)
  if album.status_code == 200:
    album = album.json()
    if info:
      click.echo('Album \'' + album['album']['name'] + '\':')
      click.echo('- color: ' + album['album']['color'])
      click.echo('- public: ' + str((album['album']['public'] == 1) and 'true' or 'false'))
      click.echo('- controls: ' + str((album['album']['controls'] == 1) and 'true' or 'false'))
      click.echo('- autoplay: ' + str((album['album']['autoplay'] == 1) and 'true' or 'false'))
      click.echo('- resources: ' + str(len(album['album']['resources'])))
      for res in album['album']['resources']:
        click.echo('  - ' + res['name'] + '.' + res['type'])
        click.echo('    - id: ' + str(res['uuid']))
        click.echo('    - name: ' + str(res['name']))
        click.echo('    - type: ' + str(res['type']))
        click.echo('    - transition: ' + str(res['transition']))
        click.echo('    - loop: ' + str((res['loop'] == 1) and 'true' or 'false'))
        click.echo('    - mute: ' + str((res['mute'] == 1) and 'true' or 'false'))
  else:
    click.echo('The album was not found.')

if __name__ == "__main__":
  cli()