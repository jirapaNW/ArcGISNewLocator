# How to Use the Widget
## For Local Development
- Copy the widget folder to /client/builder/stemapp/widgets.
- In AppBuilder screen, add the widget to the empty slot and try it.
- After editing some lines of code, delete the widget from the slot, save the builder, reload the builder, and then add it again.
## For Using in Enterprise Portal WAB
- Upload the widget folder to the directory that is accessible by Portal.
- In Portal, go to Content menu, click Add Item > An application, choose Application Extension (AppBuilder), then specify the URL to widget's manifest.json file e.g. https://yourserver/widgets/MyWidget/manifest.json, set Title and Tags, then click Add Item.
- In AppBuilder screen, your widget will appear in Custom tab in the widget pool.